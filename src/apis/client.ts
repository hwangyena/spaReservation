import { ApolloClient, fromPromise, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import MUTATIONS from "./mutations";
import Router from "next/router";
import { VARIABLES } from "src/common";

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];
let isNetworkWaiting = false;

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const getNewToken = async () => {
  const accessToken = Cookies.get(VARIABLES.ACCESS_TOKEN);
  const refreshToken = Cookies.get(VARIABLES.REFRESH_TOKEN);
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
    const resultData = result.data.renewToken;
    if (resultData) return resultData;
    return null;
  } catch {
    return null;
  }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (message.includes("유효한 accessToken이 아닙니다.")) {
        if (!isRefreshing) {
          isRefreshing = true;
          fromPromise(
            getNewToken()
              .then(async ({ accessToken, refreshToken }) => {
                Cookies.set(VARIABLES.ACCESS_TOKEN, accessToken, {
                  expires: 14,
                });
                Cookies.set(VARIABLES.REFRESH_TOKEN, refreshToken, {
                  expires: 14,
                });
                resolvePendingRequests();
                return accessToken;
              })
              .catch(() => {
                pendingRequests = [];
                Cookies.remove(VARIABLES.ACCESS_TOKEN);
                Cookies.remove(VARIABLES.REFRESH_TOKEN);
                alert(`세션이 만료 되었습니다.`);
                Router.push("/");
                return;
              })
              .finally(() => {
                isRefreshing = false;
              })
          ).filter((value) => Boolean(value));
        } else {
          fromPromise<void>(
            new Promise((resolve) => {
              pendingRequests.push(() => resolve());
            })
          );
        }
      }
    });
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    if (!isNetworkWaiting) {
      isNetworkWaiting = true;
      console.log(
        "오류 서버와의 접속이 원활하지 않습니다.\n잠시 후 다시 시도해주세요."
      );
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = Cookies.get(VARIABLES.ACCESS_TOKEN);
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

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});
