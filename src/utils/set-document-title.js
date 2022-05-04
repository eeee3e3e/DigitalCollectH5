import getRouterTitle from "@/utils/get-router-title";

// 设置页面标题
export default function setDocumentTitle(route) {
  document.title = getRouterTitle(route)
}
