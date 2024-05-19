import { gql } from "graphql-request";

export const textFields = gql`
  fragment textFields on Text {
    shortSimpleText
    longSimpleText
    richText {
      json
    }
  }
`;

export const linkFields = gql`
  fragment linkFields on Link {
    externalName
    internalName
    ctaPageUrl {
      externalName
      internalName
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
`;

export const buttonFields = gql`
  fragment buttonFields on Button {
    externalName
    internalName
    link {
      ...linkFields
    }
  }
  ${linkFields}
`;

export const mediaFields = gql`
  fragment mediaFields on Media {
    externalName
    altText
    media {
      fileName
      width
      height
      url
    }
  }
`;

export const headlineImageFields = gql`
  fragment headlineImageFields on HeadlineImage {
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
`;

const CONTENT_CONTAINERS_LIMIT = 10;
export const carouselFields = (slug: string = "") => gql`
  fragment carouselFields on Carousel {
    internalName
    externalName
    codeId
    numberToDisplayAtOneTime
    startAutoplaying
    autoplayTime
    contentCollection(where: {slug_not_in: "${slug}"}, limit: ${CONTENT_CONTAINERS_LIMIT}) {
      items {
        __typename
        ...on Page {
          internalName
          externalName
          slug
          cover {
            externalName
            altText
            media {
              fileName
              width
              height
              url
            }
          }
        }
      }
    }
  }
`;
