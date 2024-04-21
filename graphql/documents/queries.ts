import { gql } from "graphql-request";
import {
  buttonFields,
  headlineImageFields,
  mediaFields,
  textFields,
} from "./fragments";

const CONTENT_CONTAINERS_LIMIT = 10;
const PAGE_COLLECTION_LIMIT = 1;
const SLUG = "homepage";

export const PAGE = gql`
  query Page {
    pageCollection(where: { slug: "${SLUG}" }, limit: ${PAGE_COLLECTION_LIMIT}) {
      items {
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
`;
