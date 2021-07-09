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
// import { getMainDefinition } from "@apollo/client/utilities"; // subscription시 해제
// import { WebSocketLink } from "@apollo/client/link/ws"; // subscription시 해제

interface TokenType {
  accessToken?: string;
  refreshToken?: string;
}

export const getClient = ({ accessToken, refreshToken }: TokenType) => {
  if(!accessToken) accessToken = Cookies.get(VARIABLES.ACCESS_TOKEN)
  if(!refreshToken) refreshToken = Cookies.get(VARIABLES.REFRESH_TOKEN);

  const atkName = VARIABLES.ACCESS_TOKEN
  const rtkName = VARIABLES.REFRESH_TOKEN
  let isRefreshing = false;
  let pendingRequests: Array<() => void> = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
  };

  const getNewToken = async () => {
    if (!refreshToken) return null;
    const data = {
      query: MUTATIONS.RENEW_TOKEN,
      variables: { accessToken, refreshToken },
    };
    const result = await fetch(VARIABLES.END_POINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
          // const t = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`;
          // console.log(t);
          if (message.includes("유효한 accessToken이 아닙니다.")) {
            let forward$;
            if (!isRefreshing) {
              isRefreshing = true;
              forward$ = fromPromise(
                getNewToken()
                  .then(({ atk, rtk }) => {
                    Cookies.set(atkName, atk, {
                      expires: 14,
                    });
                    Cookies.set(rtkName, rtk, {
                      expires: 14,
                    });
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
        // console.log(`[Network error]: ${networkError}`);
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

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    // link: errorLink.concat(splitLink), // subscription시 해제
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: cache,
  });

  return client;
};
