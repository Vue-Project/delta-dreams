// export default function ({ store, route, redirect }) {
//   if (route.path === '/') {
//     return; // Allow access to homepage without checks
//   }
//   if (!(route.path in store.state.accessAllowed) || !store.state.accessAllowed[route.path]) {
//     return redirect('/'); // Redirect to homepage if not allowed
//   }
// }
