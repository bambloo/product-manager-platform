export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home'
  },
  routes: [
    {
      name: 'columns',
      displayName: 'menu.admin.columns',
      meta: {
        icon: 'vuestic-iconset-dashboard'
      }
      //   children: [
      //     {
      //       name: 'a',
      //       displayName: 'b',
      //       meta: { icon: 'vuestic-iconset-dashboard' },
      //       children: [
      //         {
      //           name: 'a',
      //           displayName: 'b',
      //           meta: { icon: 'vuestic-iconset-dashboard' }
      //         }
      //       ]
      //     }
      //   ]
    }
  ] as INavigationRoute[]
}
