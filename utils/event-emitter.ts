import Events from 'events';

let context;
export function init(ctx) {
  context = ctx;
}

const eventEmitter = new Events.EventEmitter();

// NOTE: set max event to unlimited, this may be dangerous, by default the max event that can be added to an event is set to 10 to avoid memory leak.
eventEmitter.setMaxListeners(0);

eventEmitter.addListener('GET_PERMISSIONS', async () => {
  try {
    const { data } = await context.$axios.$get('/api/v1/permissions');
    context.store.commit(
      'user/setPermissions',
      data.reduce((acc, item) => {
        return [...new Set([...acc, ...item.permissions])];
      }, []),
    );
  } catch (error) {
    console.log('error', error);
  }
});

eventEmitter.addListener('GET_ROLES', async () => {
  try {
    const { data } = await context.$axios.$get('/api/v1/permissions/roles');
    context.store.commit('user/setRoles', data);
  } catch (error) {
    console.log('error', error);
  }
});

export { eventEmitter, context };
