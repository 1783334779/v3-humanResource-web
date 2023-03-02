/*
 * @Author: 叶新亮
 * @Date: 2020-12-28 14:31:03
 * @LastEditTime: 2021-01-03 10:48:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cr-humanresources-web\src\router\login.js
 */
export default [
  {
    path: "/loginIndex",
    name: "loginIndex",
    redirect: {
      name: "login",
    },
    component: () => import("@/views/loginIndex.vue"),
    children: [
      {
        // LDAP登录
        path: "/login",
        name: "login",
        meta: {
          title: "登录",
          power: "",
        },
        component: () => import("@/views/login"),
      },
      // {
      //   // 超级系统管理员登录
      //   path: '/superSystemAdmins',
      //   name: 'superSystemAdminis',
      //   meta: {
      //   },
      //   component: () => import('@/views/z_login/superSystemAdmins'),
      // },
      // {
      //   // 登录中转
      //   path: '/transfer',
      //   name: 'transfer',
      //   meta: {
      //     title: 'transfer',
      //     power: '',
      //   },
      //   component: () => import('@/views/z_login/transfer'),
      // },
      // {
      //   // 403
      //   path: '/exception403',
      //   name: 'exception403',
      //   meta: {
      //     title: 'exception403',
      //     power: '',
      //   },
      //   component: () => import('@/views/z_login/exception403'),
      // },
      // {
      //   // 404
      //   path: '/exception404',
      //   name: 'exception404',
      //   meta: {
      //     title: 'exception404',
      //     power: '',
      //   },
      //   component: () => import('@/views/z_login/exception404'),
      // },
      // {
      //   // 浏览器选择页
      //   path: '/browser',
      //   name: 'browser',
      //   meta: {
      //     title: '最佳浏览器体验',
      //     power: 'browser',
      //     isBrowser: true,
      //   },
      //   component: () => import('@/views/z_browser/index'),

      // },
      // {
      //   // 浏览器选择页
      //   path: '/transferTenant',
      //   name: 'transferTenant',
      //   meta: {
      //     title: '租户选择',
      //     power: '',
      //   },
      //   component: () => import('@/views/z_login/transferTenant'),

      // },
    ],
  },
];
