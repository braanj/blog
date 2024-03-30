import { gql } from "graphql-request";

export default (str: string) => {
  const query = gql`
    ${str}
  `;

  return query;
};
