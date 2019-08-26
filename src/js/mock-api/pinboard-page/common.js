export const paginationResponse = (apiSubPath, Factory) => (pinboardId, limit, offset, count=1000) => {
  const apiUrl = `/pinboards/${pinboardId}/${apiSubPath}/?`;
  const hasNext = count > offset + limit;
  let previous = null;
  if (offset)
    if (offset > limit)
      previous = `${apiUrl}limit=${ limit }&offset=${ offset - limit }`;
    else
      previous = apiUrl;
  return {
    count,
    next: hasNext ? `${apiUrl}limit=${ limit }&offset=${ offset + limit }` : null,
    previous,
    results: Factory.buildList(hasNext ? limit : Math.max(count - offset, 0)),
  };
};
