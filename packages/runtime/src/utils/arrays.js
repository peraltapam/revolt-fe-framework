export const withoutNulls = (nodes) => {
  // != instead of !== to remove both null and undefined
  return nodes.filter((node) => node != null);
};
