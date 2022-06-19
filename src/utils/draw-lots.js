// 判断报名时间段
/**
 *
 * now--当前时间 毫秒时间戳
 * start--报名开始时间 毫秒时间戳
 * start--报名结束时间 毫秒时间戳
 *
 **/
export function judgeSignUpTime(now, start, end) {
  return now < start
    ? {
        status: 0,
        msg: '报名未开始'
      }
    : now > end
    ? {
        status: 2,
        msg: '报名已结束'
      }
    : {
        status: 1,
        msg: '报名中'
      }
}

// 判断报名状态
/**
 *
 * status--报名状态 布尔值
 *
 **/
export function judgeSignUpStatus(status) {
  return status
    ? {
        status: 1,
        msg: '报名中，已报名'
      }
    : {
        status: 0,
        msg: '报名中，未报名'
      }
}

// 判断发售状态
/**
 *
 * now--当前时间 毫秒时间戳
 * time--预售时间 毫秒时间戳
 * offset--预售时间前xx时间的偏移量 毫秒时间
 * status--手动售空状态 布尔值
 *
 **/
export function judgeSellTime(now, time, offset = 0, status = false) {
  return status
    ? {
        status: 0,
        msg: '已售空'
      }
    : time - now <= offset
    ? {
        status: 1,
        msg: '正在热售，可查看中签状态'
      }
    : {
        status: 2,
        msg: `抽签中, 倒计时`
      }
}

// 判断中签状态
/**
 *
 * bonus--中签状态 布尔值
 *
 **/
export function judgeWin(bonus) {
  return bonus
    ? {
        status: 1,
        msg: '正在热售，已中签'
      }
    : {
        status: 0,
        msg: '正在热售，未中签'
      }
}

// 距离预售开始倒计时
/**
 *
 * now--当前时间 毫秒时间戳
 * end--预售时间 毫秒时间戳
 * delay--间隔时间
 * cb--回调
 *
 */
export function countDown(now, end, delay, cb) {
  const start = new Date().valueOf()
  const timer = setTimeout(() => {
    now += new Date().valueOf() - start
    countDown(now, end, delay, cb)
  }, delay)
  const timeDiff = Math.ceil((end - now) / 1000)
  if (timeDiff > 0) {
    cb({
      status: 1,
      msg: '正在倒计时',
      timer,
      timeDiff
    })
  } else {
    clearTimeout(timer)
    cb({
      status: 0,
      msg: '倒计时已结束',
      timer,
      timeDiff: 0
    })
  }
}
