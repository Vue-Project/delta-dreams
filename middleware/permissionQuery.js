export default function ({ route, redirect, store }) {
  // Extract code and type from the current route's query
  const { code, type } = route.query

  // Check if we have new parameters in the URL
  if (code || type) {
    // If new parameters exist, update the store
    store.commit('setParams', {
      code: code || store.state.code,
      type: type || store.state.type,
      // Store when these params were last updated
      // lastUpdated: new Date().toISOString()
    })
  }

  // Get all values from the store
  const { code: storedCode, type: storedType } = store.state

  // Only add parameters to routes that don't already have them
  if ((!code && storedCode) || (!type && storedType)) {
    // Create new query with stored values for missing parameters
    const newQuery = { ...route.query }

    // Only add parameters that aren't already in the URL
    if (!code && storedCode) newQuery.code = storedCode
    if (!type && storedType) newQuery.type = storedType

    // Redirect if we need to add parameters
    if (JSON.stringify(route.query) !== JSON.stringify(newQuery)) {
      return redirect({
        path: route.path,
        query: newQuery
      })
    }
  }
}
