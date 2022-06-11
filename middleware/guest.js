export default function ({ route, redirect, store, $auth }) {
  // if (!store.state.auth.loggedIn || store.state.auth.user === null) {
  //   // console.log(store.state.auth);

  //    return redirect(`/login?redirect=${route.path}`);
  // }

  const forbiddenRoutes = [
    '/user/merchant/paystack',
    '/user/merchant/monnify',
    '/user/merchant/flutterwave',
    '/user/payments/payout-requests',
    '/user/network/staff',
    '/user/settings/configurations',
    '/user/requests/pending-agent',
    '/user/settings/feeds',
  ];

  if (
    route.path === '/user/payments/withdraw' &&
    (store.state.auth.user.role === 'tenant' || store.state.auth.user.role === 'staff' || store.state.auth.user.role === 'cashier')
  ) {
    return redirect('/403');
  }
  // Forbid user from admin routes
  for (const path of forbiddenRoutes) {
    if (route.path === path && store.state.auth.user.role !== 'tenant') {
      return redirect('/403');
    }
  }
}
