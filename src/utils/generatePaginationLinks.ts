export const generatePaginationLinks = (
  page: number,
  limit: number,
  total: number
) => {
  const haveNext = total > page * limit ? true : false;

  const links = {
    prev:
      page === 1
        ? ""
        : `http://localhost:5000/api/v1/post?page=${page - 1}&limit=${limit}`,
    self: `http://localhost:5000/api/v1/post?page=${page}&limit=${limit}`,
    next: haveNext
      ? `http://localhost:5000/api/v1/post?page=${page + 1}&limit=${limit}`
      : "",
  };

  return links;
};
