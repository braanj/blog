/**
 * Processes a collection of content containers, formatting the content items within each container.
 * @param contentContainersCollection The array of content containers to process.
 * @returns A Promise that resolves to the formatted content containers collection.
 */
export default (contentContainersCollection: any[]) => {
  if (
    !contentContainersCollection ||
    (contentContainersCollection && !contentContainersCollection.length)
  ) {
    return [];
  }

  contentContainersCollection = contentContainersCollection.reduce(
    (result: any, container: any) => {
      return [
        ...result,
        {
          internalName: container.internalName,
          content: container.contentCollection.items.reduce(
            (prev: any, content: any) => {
              const type = formatContentContainerType(content.__typename);

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
};

function formatContentContainerType(type: any) {
  const formatedType = type
    .match(/[A-Z]*[^A-Z]+/g)
    .join("-")
    .toLowerCase();

  return `shared-${formatedType}`;
}
