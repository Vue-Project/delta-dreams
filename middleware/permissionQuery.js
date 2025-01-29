export default function ({ route, redirect }) {
  // Define your query parameters
  const queryParams = {
    code: 'fLWKqJqshtwrX8vV',
    type: 'admin',
  };

  // Merge existing query parameters with the new ones
  const newQuery = { ...route.query, ...queryParams };

  // Redirect to the same route with the new query parameters
  if (JSON.stringify(route.query) !== JSON.stringify(newQuery)) {
    return redirect({
      path: route.path,
      query: newQuery,
    });
  }
}
