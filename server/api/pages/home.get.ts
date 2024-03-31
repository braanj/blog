import request from "~/server/api/utils/graphql/request";
import { gql } from "graphql-request";

export default defineEventHandler(async (_: any) => {
  const q = gql`
    query {
      pageCollection(where: { slug: "homepage" }, limit: 1) {
        items {
          externalName
          contentContainersCollection(limit: 10) {
            items {
              externalName
              contentCollection(limit: 10) {
                items {
                  __typename
                  ... on Text {
                    shortSimpleText
                    longSimpleText
                    richText {
                      json
                    }
                  }
                  ... on Button {
                    externalName
                    link {
                      externalName
                      ctaPageUrl {
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
                    externalName
                    altText
                    media {
                      fileName
                      width
                      height
                      url
                    }
                  }
                  ... on HeadlineImage {
                    internalName
                    externalName
                    subtitle
                    featuredImage {
                      internalName
                      altText
                      media {
                        url
                      }
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
