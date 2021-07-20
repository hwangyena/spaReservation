import {
  ApolloClient,
  fromPromise,
  InMemoryCache,
  split,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import MUTATIONS from "./mutations";
import Router from "next/router";
import { VARIABLES } from "src/common";
import { concatPagination, Observable } from "@apollo/client/utilities";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

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
        for (const err of graphQLErrors) {
          const { message, locations, path } = err;
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
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const authLink = setContext(async (_, { headers }) => {
    if (!accessToken) accessToken = Cookies.get(VARIABLES.ACCESS_TOKEN) ?? "";

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const httpLink = createUploadLink({
    uri: VARIABLES.END_POINT,
  });

  // for sub. SSR중에는 subscription이 먹통이 되므로 브라우저의 경우에만 작동하도록 설정
  const splitLink = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        new WebSocketLink({
          uri: `ws${
            VARIABLES.END_POINT.match(/https:\/\//) ? "s" : ""
          }://${VARIABLES.END_POINT.replace(/https?:\/\//, "")}`,
          options: {
            lazy: true,
            reconnect: true,
            connectionParams: async () => {
              return {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
              };
            },
          },
        }),
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

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
    link: errorLink.concat(splitLink), // for sub
    // link: errorLink.concat(authLink.concat(httpLink)), // no sub
    cache: cache,
  });

  return client;
};
