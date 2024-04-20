import { gql } from "graphql-request";
import {
  buttonFields,
  headlineImageFields,
  mediaFields,
  textFields,
} from "./fragments";

export const PAGE = gql`
  query Page {
    pageCollection(where: { slug: "homepage" }, limit: 1) {
      items {
        externalName
        internalName
        contentContainersCollection(limit: 10) {
          items {
            externalName
            internalName
            contentCollection(limit: 10) {
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
