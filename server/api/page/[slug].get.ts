import useRequest from "~/server/api/utils/useRequest";
import { usePageQuery } from "@/graphql/documents/queries";
import extractContent from "../utils/extractContent";

// TODO: generate types from the response & move it to the types folder
type Page = {
  [x: string]: any;
};

export default defineEventHandler(async (event: any) => {
  const { slug } = event.context.params;
  const query = usePageQuery(slug);

  const data: Page = await useRequest<Page>(query);

  return extractContent(
    data.pageCollection.items[0]?.contentContainersCollection.items
  );
});
