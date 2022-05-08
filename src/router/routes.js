import { AppLayout } from '@/layout'

// meta = {
//   showTabBar: false, // 展示底部 showTabBar
//   title: '', // 页面标题
//   showToBack: '', // 是否显示返回按钮
// }

const routes = [
  {
    path: '/city-meta',
    component: AppLayout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页',
          showTabBar: true
        },
        component: () => import('@/views/Home')
      },
      {
        path: 'my-center',
        meta: {
          title: '会员中心',
          showTabBar: true
        },
        component: () => import('@/views/MyCenter')
      },
      {
        path: 'edit-userinfo',
        meta: {
          title: '会员中心',
          showToBack: true
        },
        component: () => import('@/views/EditUserInfo')
      },
      {
        path: 'authentication',
        meta: {
          title: '实名认证',
          showToBack: true
        },
        component: () => import('@/views/Authentication')
      },
      {
        path: 'authentication-result',
        meta: {
          title: '认证结果',
          // showToBack: true
        },
        component: () => import('@/views/AuthenticationResult')
      },
      {
        path: 'contact-us',
        meta: {
          title: '联系我们',
          showToBack: true
        },
        component: () => import('@/views/ContactUs')
      },
      {
        path: 'collection',
        meta: {
          title: '我的藏宝库',
          showTabBar: true
        },
        component: () => import('@/views/Collection')
      },
      {
        path: 'conversion',
        meta: {
          title: '空投兑换',
          showToBack: true
        },
        component: () => import('@/views/Conversion')
      },
      {
        path: 'conversion-result',
        meta: {
          title: '兑换结果结果',
          showToBack: true
        },
        component: () => import('@/views/ConversionResult')
      },
      {
        path: 'collection_s',
        meta: {
          title: '藏品详情',
          showToBack: true
        },
        component: () => import('@/views/CollectionDetail')
      },
      {
        path: 'verification-code-login',
        meta: {
          title: '登录',
          showToBack: true,
        },
        component: () => import('@/views/VerificationCodeLogin')
      },
      {
        path: 'verification-code-input',
        meta: {
          title: '登录'
        },
        component: () => import('@/views/VerificationCodeInput')
      },
      {
        path: 'security-settings',
        meta: {
          title: '安全设置',
          showToBack: true,
        },
        component: () => import('@/views/SecuritySettings')
      },
      {
        path: 'about-us',
        meta: {
          title: '关于我们',
          showToBack: true,
        },
        component: () => import('@/views/AboutUs')
      },
      {
        path: '*',
        redirect: '/city-meta/home'
      }
    ]
  },
  {
    path: '*',
    redirect: '/city-meta/home'
  }
]

export default routes
