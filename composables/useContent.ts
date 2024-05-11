export default async <T>(contentContainersCollection: any) => {
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
};
