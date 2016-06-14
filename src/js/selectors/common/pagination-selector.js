export const getPaginationInfo = pagination => {
  const { count, next, previous } = pagination;
  return { count, next, previous };
};
