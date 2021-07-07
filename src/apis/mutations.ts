import { gql } from "@apollo/client";

const MUTATIONS = {
  // 토큰 재발급
  RENEW_TOKEN: gql`
    mutation RENEW_TOKEN($accessToken: String, $refreshToken: String) {
      renewToken(accessToken: $accessToken, refreshToken: $refreshToken) {
        accessToken
        refreshToken
      }
    }
  `,
};

export default MUTATIONS;
