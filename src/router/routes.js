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
        path: 'collection-examples',
        meta: {
          title: '转赠好友',
          showToBack: true
        },
        component: () => import('@/views/CollectionExamples')
      },
      {
        path: 'examples-successful',
        meta: {
          title: '转赠成功',
          // showToBack: true
        },
        component: () => import('@/views/examplesSuccessful')
      },
      {
        path: 'examples-record',
        meta: {
          title: '转赠记录',
          showToBack: true
        },
        component: () => import('@/views/examplesRecord')
      },
      {
        path: 'collection-list',
        meta: {
          title: '藏品列表',
          showToBack: true
        },
        component: () => import('@/views/CollectionList')
      },
      {
        path: 'my-news',
        meta: {
          title: '我的消息',
          showToBack: true
        },
        component: () => import('@/views/MyNews')
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
        path: 'pay-password',
        meta: {
          title: '设置支付密码',
          showToBack: true,
        },
        component: () => import('@/views/PayPassword')
      },
      {
        path: 'set-password',
        meta: {
          title: '设置支付密码',
          showToBack: true,
        },
        component: () => import('@/views/SetPassword')
      },
      {
        path: 'again-password',
        meta: {
          title: '设置支付密码',
          showToBack: true,
        },
        component: () => import('@/views/AgainPassword')
      },
      {
        path: 'set-results',
        meta: {
          title: '设置结果',
          showToBack: true,
        },
        component: () => import('@/views/SetResults')
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
        path: 'help-document',
        meta: {
          title: '关于我们',
          showToBack: true,
        },
        component: () => import('@/views/HelpDocument')
      },
      {
        path: 'invite-friends',
        meta: {
          title: '邀请好友',
          // showToBack: true,
        },
        component: () => import('@/views/inviteFriends')
      },
      {
        path: 'invite-friends-placard',
        meta: {
          title: '邀请海报',
          // showToBack: true,
        },
        component: () => import('@/views/inviteFriendsPlacard')
      },
      {
        path: 'register',
        meta: {
          title: '注册',
          // showToBack: true,
        },
        component: () => import('@/views/Register')
      },
      {
        path: 'integral',
        meta: {
          title: '我的城市金',
          showToBack: true,
        },
        component: () => import('@/views/integral')
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
