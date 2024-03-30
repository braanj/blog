import request from "~/server/api/utils/graphql/request";
import query from "./utils/graphql/query";

export default defineEventHandler(async (_: any) => {
  const q = query(`
    query {
      websiteCollection {
        items {
          internalName
          externalName
          pagesCollection {
            items {
              internalName
              externalName
              slug
            }
          }
        }
      }
    }
  `);

  const data = await request(q);
  return data;
});
