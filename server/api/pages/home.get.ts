import request from "~/server/api/utils/graphql/request";
import { gql } from "graphql-request";

export default defineEventHandler(async (_: any) => {
  const q = gql`
    query {
      pageCollection(where: { internal_name: "Landing Page" }) {
        items {
          internalName
          externalName
          contentContainersCollection {
            items {
              internalName
              externalName
            }
          }
        }
      }
    }
  `;

  const data = await request(q);
  return data;
});
