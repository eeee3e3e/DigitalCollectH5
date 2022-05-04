import APP_SETTING from "@/settings";
import { isEmpty, isObject } from "lodash";

// 获取路由标题
export default function getRouterTitle(route) {
  const { meta } = route

  let title = APP_SETTING.title

  if (isObject(meta) && !isEmpty(meta)) {
    title = meta.title
  }

  return title
}
