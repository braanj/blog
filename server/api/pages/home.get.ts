import useRequest from "~/server/api/utils/useRequest";
import { PAGE } from "@/graphql/documents/queries";

// TODO: generate types from the response & move it to the types folder
type Page = {
  [x: string]: any;
};

export default defineEventHandler(async (_: any) => {
  const data: Page = await useRequest<Page>(PAGE);
  return useContentContainers(data);
});

// Reusable functions specific for this endpoint
function useContentContainers(data: Page) {
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
}
