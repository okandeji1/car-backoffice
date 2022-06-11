export default function ({ route, store }) {
  if (route.path === '/games/lucky-six') {
    const cl = document.documentElement.classList;
    cl.remove(store.state.settings.theme);

    cl.add('dark');
  }
}
