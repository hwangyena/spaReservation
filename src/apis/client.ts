import {
  ApolloClient,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'
import MUTATIONS from './mutations'
import Router from 'next/router'
import { VARIABLES } from 'src/common'
import { Observable } from '@apollo/client/utilities'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { isEqual, merge } from 'lodash'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

const atkName = VARIABLES.ACCESS_TOKEN
const rtkName = VARIABLES.REFRESH_TOKEN
let isRefreshing = false
let pendingRequests: Array<() => void> = []

const resolvePendingRequests = () => {
  pendingRequests.map(callback => callback())
  pendingRequests = []
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        const { message, locations, path } = err
        const t = `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        console.log(t)
        if (message.includes('유효한 accessToken이 아닙니다.')) {
          let forward$: Observable<any>
          if (!isRefreshing) {
            isRefreshing = true
            const atk = Cookies.get(atkName)
            const rtk = Cookies.get(rtkName)
            forward$ = fromPromise(
              client
                .mutate({
                  mutation: MUTATIONS.RENEW_TOKEN,
                  variables: { atk, rtk },
                })
                .then(({ data: { accessToken, refreshToken } }) => {
                  Cookies.set(atkName, accessToken, { expires: 14 })
                  Cookies.set(rtkName, refreshToken, { expires: 14 })
                  return true
                })
                .then(() => {
                  resolvePendingRequests()
                  return true
                })
                .catch(() => {
                  pendingRequests = []
                  Cookies.remove(atkName)
                  Cookies.remove(rtkName)
                  Router.push('/')
                  return false
                })
                .finally(() => {
                  isRefreshing = false
                })
            ).filter(value => Boolean(value))
          } else {
            forward$ = fromPromise<void>(
              new Promise(resolve => {
                pendingRequests.push(() => resolve())
              })
            )
          }
          return forward$.flatMap(() => forward(operation))
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
)

const authLink = setContext(async (_, { headers }) => {
  const atk = Cookies.get(VARIABLES.ACCESS_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: atk ? `Bearer ${atk}` : '',
    },
  }
})

const httpLink = createUploadLink({
  uri: VARIABLES.END_POINT,
})

// SSR중에는 subscription이 먹통이 되므로 브라우저의 경우에만 작동하도록 설정
const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      new WebSocketLink({
        uri: `ws${
          VARIABLES.END_POINT.match(/https:\/\//) ? 's' : ''
        }://${VARIABLES.END_POINT.replace(/https?:\/\//, '')}`,
        options: {
          lazy: true,
          reconnect: true,
          connectionParams: async () => {
            const atk = Cookies.get(VARIABLES.ACCESS_TOKEN)
            return {
              Authorization: atk ? `Bearer ${atk}` : '',
            }
          },
        },
      }),
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink)

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: errorLink.concat(splitLink),
  // link: errorLink.concat(authLink.concat(httpLink)), // no sub
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  },
})

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? client
  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })
    _apolloClient.cache.restore(data)
  }
  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export const useApollo = (pageProps: AppProps['pageProps']) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
