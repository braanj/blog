import { gql } from "graphql-request";
import {
  buttonFields,
  carouselFields,
  headlineImageFields,
  mediaFields,
  textFields,
} from "./fragments";

const CONTENT_CONTAINERS_LIMIT = 10;
const PAGE_COLLECTION_LIMIT = 1;

export const usePageQuery = (slug: string) => {
  return gql`
  query Page {
    pageCollection(where: { slug: "${slug}" }, limit: ${PAGE_COLLECTION_LIMIT}) {
      items {
        externalName
        parent {
          externalName
          slug
        }
        contentContainersCollection(limit: ${CONTENT_CONTAINERS_LIMIT}) {
          items {
            externalName
            contentCollection(limit: ${CONTENT_CONTAINERS_LIMIT}) {
              items {
                __typename
                ...textFields
                ...buttonFields
                ...mediaFields
                ...headlineImageFields
                ...carouselFields
              }
            }
          }
        }
      }
    }
  }
  ${textFields}
  ${buttonFields}
  ${mediaFields}
  ${headlineImageFields}
  ${carouselFields(slug)}
`;
};

export const useSettingsQuery = () => {
  return gql`
    query Settings {
      settingsCollection(limit: 1) {
        items {
          homepage {
            externalName
            internalName
            contentContainersCollection(limit: ${CONTENT_CONTAINERS_LIMIT}) {
              items {
                externalName
                internalName
                contentCollection(limit: ${CONTENT_CONTAINERS_LIMIT}) {
                  items {
                    __typename
                    ...textFields
                    ...buttonFields
                    ...mediaFields
                    ...headlineImageFields
                    ...carouselFields
                  }
                }
              }
            }
          }
        }
      }
    }
    ${textFields}
    ${buttonFields}
    ${mediaFields}
    ${headlineImageFields}
    ${carouselFields()}
  `;
};
