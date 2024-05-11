export default async <T>(slug: string) => {
  const response = await useFetchWithCache(`/api/discover/${slug}`);
  return response;
};
