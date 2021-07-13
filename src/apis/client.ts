import {
  ApolloClient,
  fromPromise,
  InMemoryCache,
  // split, // subscription시 해제
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import MUTATIONS from "./mutations";
import Router from "next/router";
import { VARIABLES } from "src/common";
import { concatPagination, Observable } from "@apollo/client/utilities";
// import { getMainDefinition } from "@apollo/client/utilities"; // subscription시 해제
// import { WebSocketLink } from "@apollo/client/link/ws"; // subscription시 해제

/**
 * serverside중 토큰을 받아 아폴로 클라이언트를 생성하는 함수
 * @param accessToken 엑세스토큰
 * @param refreshToken 리프레쉬토큰
 * @returns 아폴로 클라이언트
 */
export const getClient = (accessToken = "", refreshToken = "") => {
  const atkName = VARIABLES.ACCESS_TOKEN;
  const rtkName = VARIABLES.REFRESH_TOKEN;
  let isRefreshing = false;
  let pendingRequests: Array<() => void> = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
  };

  const getNewToken = async () => {
    if (!refreshToken)
      refreshToken = Cookies.get(VARIABLES.REFRESH_TOKEN) ?? "";
    if (!refreshToken) return null;
    const data = {
      query: MUTATIONS.RENEW_TOKEN,
      variables: { accessToken, refreshToken },
    };
    const result = await fetch(VARIABLES.END_POINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    try {
      const newToken = result.data.renewToken;
      if (newToken) return newToken;
      return null;
    } catch {
      return null;
    }
  };

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          const t = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
          console.log(t);
          if (message.includes("유효한 accessToken이 아닙니다.")) {
            let forward$: Observable<any>;
            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(({ atk, rtk }) => {
                    Cookies.set(atkName, atk, { expires: 14 });
                    Cookies.set(rtkName, rtk, { expires: 14 });
                    accessToken = atk;
                    resolvePendingRequests();
                    return atk;
                  })
                  .catch(() => {
                    pendingRequests = [];
                    Cookies.remove(atkName);
                    Cookies.remove(rtkName);
                    alert("세션이 만료 되었습니다.");
                    Router.push("/");
                    return;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              ).filter((value) => Boolean(value));
            } else {
              forward$ = fromPromise<void>(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }
            return forward$.flatMap(() => forward(operation));
          }
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  // subscription시 해제
  // const wsLink = new WebSocketLink({
  //   uri: VARIABLES.END_POINT,
  //   options: {
  //     lazy: true,
  //     reconnect: true,
  //     connectionParams: async () => {
  //       return { Authorization: accessToken ? `Bearer ${accessToken}` : "" };
  //     },
  //   },
  // });

  const authLink = setContext(async (_, { headers }) => {
    if (!accessToken) accessToken = Cookies.get(VARIABLES.ACCESS_TOKEN) ?? "";

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const httpLink = createUploadLink({
    uri: VARIABLES.END_POINT,
  });

  // subscription시 해제
  // const splitLink = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return (
  //       definition.kind === "OperationDefinition" &&
  //       definition.operation === "subscription"
  //     );
  //   },
  //   wsLink,
  //   authLink.concat(httpLink)
  // );

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          selectPostsByEveryone: concatPagination(),
          selectFaqsByEveryone: concatPagination(),
        },
      },
    },
  });

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    // link: errorLink.concat(splitLink), // subscription시 밑에 코드와 교체
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: cache,
  });

  return client;
};
