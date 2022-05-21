import { toString } from "lodash";

function filterMobileNo(phoneNo) {
  if (!phoneNo) return ''
  if (typeof phoneNo === 'number') phoneNo = toString(phoneNo)
  return phoneNo.slice(0, 3) + '****' + phoneNo.slice(7)
}

function filterIDCard(idCard) {
  if (!idCard) return ''
  if (typeof idCard === 'number') idCard = toString(idCard)
  return idCard.slice(0, 4) + (Array.from({ length: idCard.length - 8 }).map(() => '*').join('')) + idCard.slice(idCard.length - 4)
}

function filterCommodityID(commodityID) {
  if (!commodityID) return ''
  if (typeof commodityID === 'number') commodityID = toString(commodityID)
  return commodityID.slice(commodityID.length - 10)
}

export default function (Vue) {
  Vue.filter('filterMobileNo', filterMobileNo)
  Vue.filter('filterIDCard', filterIDCard)
  Vue.filter('filterCommodityID', filterCommodityID)
}
