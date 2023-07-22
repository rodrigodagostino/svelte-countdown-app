import { writable, get } from 'svelte/store';

interface ITimer {
  status: 'idle' | 'running';
  initialTime: number;
  currentTime: number;
  intervalId: ReturnType<typeof setInterval>;
}

export const timer = writable<ITimer>({
  status: 'idle',
  initialTime: 0,
  currentTime: 0,
  intervalId: null,
});

const setStatus = (value: ITimer['status']) => {
  timer.update((currData) => ({
    ...currData,
    status: value,
  }));
};

export const setInitialTime = (value: ITimer['initialTime']) => {
  timer.update((currData) => ({
    ...currData,
    initialTime: value,
  }));
};

export const setCurrentTime = (value: ITimer['currentTime']) => {
  timer.update((currData) => ({
    ...currData,
    currentTime: value,
  }));
};

export const increaseTime = (value: number) => {
  pauseTimer();

  const $timer = get(timer);

  setInitialTime($timer.currentTime + value);
  setCurrentTime($timer.currentTime + value);
};

export const decreaseTime = (value: number) => {
  pauseTimer();

  const $timer = get(timer);
  if ($timer.initialTime - value < 0) return;

  setInitialTime($timer.initialTime - value);
  setCurrentTime($timer.currentTime - value);
};

export const startTimer = () => {
  let $timer;
  const unsubscribe = timer.subscribe((currData) => ($timer = currData));

  if (!$timer.initialTime || !$timer.currentTime) return;

  setStatus('running');
  timer.update((currData) => ({
    ...currData,
    intervalId: setInterval(() => {
      if ($timer.currentTime <= 0) {
        pauseTimer();
        unsubscribe();
        return;
      }
      timer.update((currData) => ({
        ...currData,
        currentTime: currData.currentTime - 1000,
      }));
    }, 1000),
  }));
};

export const pauseTimer = () => {
  const $timer = get(timer);

  timer.update((currData) => ({
    ...currData,
    status: 'idle',
  }));
  clearInterval($timer.intervalId);
};

export const resetTimer = () => {
  const $timer = get(timer);

  pauseTimer();
  setCurrentTime($timer.initialTime);
};
