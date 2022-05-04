import { Toast } from 'vant'

export function showAppLoading() {
  return Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
}

export function closeAppLoading() {
  return Toast.clear()
}


const AppLoading = { showAppLoading, closeAppLoading }

export default AppLoading
