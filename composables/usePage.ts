export default async <T>(slug: string) => {
  const { data } = useAsyncData(`${slug}-page-data`, async () => {
    const contentContainers = await useFetchWithCache(`/api/discover/${slug}`);
    return contentContainers;
  });

  return data;
};
