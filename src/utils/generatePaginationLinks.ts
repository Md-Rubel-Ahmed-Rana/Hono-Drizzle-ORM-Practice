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
        : `https://hono-drizzle-app.onrender.com/api/v1/post?page=${
            page - 1
          }&limit=${limit}`,
    self: `https://hono-drizzle-app.onrender.com/api/v1/post?page=${page}&limit=${limit}`,
    next: haveNext
      ? `https://hono-drizzle-app.onrender.com/api/v1/post?page=${
          page + 1
        }&limit=${limit}`
      : "",
  };

  return links;
};
