import request from "~/server/api/utils/graphql/request";
import { gql } from "graphql-request";

export default defineEventHandler(async (_: any) => {
  const q = gql`
    query {
      pageCollection(where: { internal_name: "Landing Page" }, limit: 1) {
        items {
          internalName
          externalName
          contentContainersCollection(limit: 1) {
            items {
              internalName
              externalName
              contentCollection(limit: 10) {
                items {
                  __typename
                  ... on Text {
                    internalName
                    shortSimpleText
                    longSimpleText
                    richText {
                      json
                    }
                  }
                  ... on Button {
                    internalName
                    externalName
                    link {
                      internalName
                      externalName
                      ctaPageUrl {
                        internalName
                        externalName
                        slug
                      }
                      iconImage {
                        fileName
                        width
                        height
                        title
                        url
                      }
                    }
                  }
                  ... on Media {
                    internalName
                    externalName
                    altText
                    media {
                      fileName
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  type Page = {
    [x: string]: any;
  };

  const data: Page = (await request(q)) as Page;

  // Return content containers only
  let contentContainersCollection =
    data.pageCollection.items[0].contentContainersCollection.items;

  contentContainersCollection = contentContainersCollection.reduce(
    (result: any, container: any) => {
      return [
        ...result,
        {
          internalName: container.internalName,
          content: container.contentCollection.items.reduce(
            (prev: any, content: any) => {
              const formatedContent = { ...content, type: content.__typename };
              delete formatedContent.__typename;
              return [...prev, formatedContent];
            },
            []
          ),
        },
      ];
    },
    []
  );

  return contentContainersCollection;
});
