import { GraphQLClient } from "graphql-request";

export default <T>(query: any): Promise<T> => {
  const config = useRuntimeConfig();

  const graphQLClient = new GraphQLClient(
    `https://graphql.contentful.com/content/v1/spaces/${config.contentfulSpaceId}`,
    {
      headers: {
        authorization: `Bearer ${config.contentfulToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return graphQLClient.request(query);
};
