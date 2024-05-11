export default async <T>(slug: string) => {
  const response = await useFetchWithCache(`/api/page/${slug}`);
  return response;
};
