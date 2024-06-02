import useRequest from "~/server/api/utils/useRequest";
import { gql } from "graphql-request";

export default defineEventHandler(async (event: any) => {
  const query = gql`
    query Page {
      pageCollection {
        items {
          externalName
          slug
          parent {
            externalName
            slug
          }
        }
      }
    }
  `;

  const {
    pageCollection: { items },
  } = await useRequest<any>(query);

  function createPageFullPath(page: any): string {
    if (!page.parent) return page.slug;
    const parent = items.find((item: any) => item.slug === page.parent.slug);
    return `${createPageFullPath(parent)}/${page.slug}`;
  }

  const outline = items.reduce((prev: any, next: any) => {
    const path = createPageFullPath(next);
    return [
      ...prev,
      {
        label: next.externalName,
        path,
      },
    ];
  }, []);

  return outline;
});
