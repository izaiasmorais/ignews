import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl52nnsdc2b2k01t37fc5ezil/master",
  cache: new InMemoryCache(),
});
