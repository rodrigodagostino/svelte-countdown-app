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
  timer.update((currData) => ({
    ...currData,
    status: value,
  }))
}

export const setInitialTime = (value) => {
  timer.update((currData) => ({
    ...currData,
    initialTime: value,
  }))
}

export const setCurrentTime = (value) => {
  timer.update((currData) => ({
    ...currData,
    currentTime: value,
  }))
}

export const increaseTime = (value) => {
  pauseTimer()

  let timerRef
  timer.subscribe((currData) => (timerRef = currData))

  setInitialTime(timerRef.currentTime + value)
  setCurrentTime(timerRef.currentTime + value)
}

export const decreaseTime = (value) => {
  pauseTimer()
  let timerRef

  timer.subscribe((currData) => (timerRef = currData))
  if (timerRef.initialTime - value < 0) return

  setInitialTime(timerRef.initialTime - value)
  setCurrentTime(timerRef.currentTime - value)
}

export const startTimer = () => {
  let timerRef
  timer.subscribe((currData) => (timerRef = currData))

  if (!timerRef.initialTime || !timerRef.currentTime) return

  setStatus('running')
  timer.update((currData) => ({
    ...currData,
    intervalId: setInterval(() => {
      if (timerRef.currentTime <= 0) {
        pauseTimer()
        return
      }
      timer.update((currData) => ({
        ...currData,
        currentTime: currData.currentTime - 1000,
      }))
    }, 1000),
  }))
}

export const pauseTimer = () => {
  let timerRef
  timer.subscribe((currData) => (timerRef = currData))

  timer.update((currData) => ({
    ...currData,
    status: 'idle',
  }))
  clearInterval(timerRef.intervalId)
}

export const resetTimer = () => {
  let timerRef
  timer.subscribe((currData) => (timerRef = currData))

  pauseTimer()
  setCurrentTime(timerRef.initialTime)
}
