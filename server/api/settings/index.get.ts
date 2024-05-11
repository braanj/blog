import useRequest from "~/server/api/utils/useRequest";
import { useSettingsQuery } from "@/graphql/documents/queries";
import useContent from "@/composables/useContent";

// TODO: create settings type
export default defineEventHandler(async (event: any) => {
  const query = useSettingsQuery();
  const reponse: any = await useRequest<any>(query);

  const data = useContent(
    reponse.settingsCollection.items[0].homepage.contentContainersCollection
      .items
  );
  return data;
});
