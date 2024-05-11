export default async <T>() => {
  const response = await useFetchWithCache(`/api/settings`);
  return response;
};
