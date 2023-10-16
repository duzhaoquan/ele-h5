import { cancelRaf, rAF } from '@/utils/raf'
import { ref, computed, type Ref } from 'vue'

type currentTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  millsecond: number
  total: number
}

type UseCountDownOptions = {
  time: number
  millisecond?: boolean
  onchenge?: (current: currentTime) => void
  finish?: () => void
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOURS = 60 * MINUTE
const DAY = 24 * HOURS

const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOURS)
  const minutes = Math.floor((time % HOURS) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const millsecond = Math.floor(time % SECOND)
  return {
    days,
    hours,
    minutes,
    seconds,
    millsecond,
    total: time,
  }
}

const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function UseCountDown(optoin: UseCountDownOptions) {
  let refId: number
  let countting: boolean
  let endTme: number
  //倒计时剩余时间
  const remain: Ref = ref(optoin.time)
  const current = computed(() => parseTime(remain.value))

  const pause = () => {
    countting = false
    optoin.finish?.()
  }

  const getCurrentRemain = () => Math.max(endTme - Date.now(), 0)
  const resetRemain = (value: number) => {
    remain.value = Math.max(endTme - Date.now(), 0)
    optoin.onchenge?.(current.value)
    if (value === 0) {
      pause()
      cancelRaf(refId)
    }
  }
  //毫秒级倒计时循环
  const miroTick = () => {
    refId = rAF(() => {
      if (countting) {
        resetRemain(getCurrentRemain())
        if (remain.value > 0) {
          miroTick()
        }
      }
    })
  }
  //秒级倒计时循环
  const maroTick = () => {
    refId = rAF(() => {
      if (countting) {
        const cRemain = getCurrentRemain()
        if (!isSameSecond(cRemain, remain.value) || cRemain === 0) {
          resetRemain(cRemain)
        }
        if (remain.value > 0) {
          maroTick()
        }
      }
    })
  }

  const start = () => {
    if (!countting) {
      countting = true
      endTme = optoin.time + Date.now()

      if (optoin.millisecond) {
        miroTick()
      } else {
        maroTick()
      }
    }
  }
  const reset = (totalTime = optoin.time) => {
    pause()
    remain.value = totalTime
  }
  return {
    start,
    pause,
    reset,
    current,
  }
}
