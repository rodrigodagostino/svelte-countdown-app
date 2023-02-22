import { writable } from 'svelte/store'

interface Timer {
  status: 'idle' | 'running'
  initialTime: number
  currentTime: number
  intervalId: ReturnType<typeof setInterval>
}

export const timer = writable<Timer>({
  status: 'idle',
  initialTime: 0,
  currentTime: 0,
  intervalId: null,
})

const setStatus = (value) => {
  timer.update((prevValue) => ({
    ...prevValue,
    status: value,
  }))
}

export const setInitialTime = (value) => {
  timer.update((prevValue) => ({
    ...prevValue,
    initialTime: value,
  }))
}

export const setCurrentTime = (value) => {
  timer.update((prevValue) => ({
    ...prevValue,
    currentTime: value,
  }))
}

export const increaseTime = (value) => {
  pauseTimer()
  let timerInstance
  timer.subscribe((prevValue) => (timerInstance = prevValue))
  setInitialTime(timerInstance.currentTime + value)
  setCurrentTime(timerInstance.currentTime + value)
}

export const decreaseTime = (value) => {
  pauseTimer()
  let timerInstance
  timer.subscribe((prevValue) => (timerInstance = prevValue))
  if (timerInstance.initialTime - value < 0) return
  setInitialTime(timerInstance.initialTime - value)
  setCurrentTime(timerInstance.currentTime - value)
}

export const startTimer = () => {
  let timerInstance
  timer.subscribe((prevValue) => (timerInstance = prevValue))
  if (!timerInstance.initialTime || !timerInstance.currentTime) return
  setStatus('running')
  timer.update((currValue) => ({
    ...currValue,
    intervalId: setInterval(() => {
      if (timerInstance.currentTime <= 0) {
        pauseTimer()
        return
      }
      timer.update((currValue) => ({
        ...currValue,
        currentTime: currValue.currentTime - 1000,
      }))
    }, 1000),
  }))
}

export const pauseTimer = () => {
  let timerInstance
  timer.subscribe((prevValue) => (timerInstance = prevValue))
  timer.update((currValue) => ({
    ...currValue,
    status: 'idle',
  }))
  clearInterval(timerInstance.intervalId)
}

export const resetTimer = () => {
  let timerInstance
  timer.subscribe((prevValue) => (timerInstance = prevValue))
  pauseTimer()
  setCurrentTime(timerInstance.initialTime)
}
