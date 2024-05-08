import useRequest from "~/server/api/utils/useRequest";
import { usePageQuery } from "@/graphql/documents/queries";

// TODO: generate types from the response & move it to the types folder
type Page = {
  [x: string]: any;
};

export default defineEventHandler(async (event: any) => {
  const { slug } = event.context.params;
  const query = usePageQuery(slug);

  const data: Page = await useRequest<Page>(query);
  return useContentContainers(data);
});

// Reusable functions specific for this endpoint
function useContentContainers(data: Page) {
  let contentContainersCollection =
    data.pageCollection.items[0]?.contentContainersCollection.items;

  contentContainersCollection = contentContainersCollection.reduce(
    (result: any, container: any) => {
      return [
        ...result,
        {
          internalName: container.internalName,
          content: container.contentCollection.items.reduce(
            (prev: any, content: any) => {
              const type = `shared-${content.__typename
                .match(/[A-Z]*[^A-Z]+/g)
                .join("-")
                .toLowerCase()}`;

              const formatedContent = { ...content, type };
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
}
