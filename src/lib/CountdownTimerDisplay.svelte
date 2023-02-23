<script lang="ts">
  import { debounce } from 'lodash'
  import {
    increaseTime,
    decreaseTime,
    timer,
    pauseTimer,
    setInitialTime,
    setCurrentTime,
  } from '../store'
  import BaseButton from './Button.svelte'

  $: displayedTime = {
    hours: formatNumber(Math.floor($timer.currentTime / 1000 / 60 / 60)),
    minutes: formatNumber(Math.floor(($timer.currentTime / 1000 / 60) % 60)),
    seconds: formatNumber(Math.ceil($timer.currentTime / 1000) % 60),
  }

  const setDisplayedTimeAsInitialAndCurrentTime = debounce((event, units) => {
    const hoursInMS = displayedTime.hours * MILLISECONDS.hour
    const minutesInMS = displayedTime.minutes * MILLISECONDS.minute
    const secondsInMS = displayedTime.seconds * MILLISECONDS.second
    let totalInMS = 0
    switch (units) {
      case 'hours':
        totalInMS =
          event.target.value * MILLISECONDS.hour + minutesInMS + secondsInMS
        break
      case 'minutes':
        totalInMS =
          hoursInMS + event.target.value * MILLISECONDS.minute + secondsInMS
        break
      case 'seconds':
        totalInMS =
          hoursInMS + minutesInMS + event.target.value * MILLISECONDS.second
        break
    }
    pauseTimer()
    setInitialTime(totalInMS)
    setCurrentTime(totalInMS)
  }, 800)

  const formatNumber = (num) => (num < 10 ? `0${num}` : num)

  const checkIsNumber = (event) => {
    const keyCode = event.keyCode
    if (
      (!(keyCode >= 48) && !(keyCode <= 57)) ||
      (!(keyCode >= 96) && !(keyCode <= 105))
    )
      event.preventDefault()
  }

  const MILLISECONDS = {
    hour: 3600000,
    minute: 60000,
    second: 1000,
  }
</script>

<div class="column">
  <BaseButton
    variant="flat"
    icon="chevron-up"
    on:click={() => increaseTime(MILLISECONDS.hour)}
  />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.hours}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'hours')}
  />
  <BaseButton
    variant="flat"
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.hour)}
  />
  <span class="time-label">H</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <BaseButton
    variant="flat"
    icon="chevron-up"
    on:click={() => increaseTime(MILLISECONDS.minute)}
  />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.minutes}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'minutes')}
  />
  <BaseButton
    variant="flat"
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.minute)}
  />
  <span class="time-label">M</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <BaseButton
    variant="flat"
    icon="chevron-up"
    on:click={() => increaseTime(MILLISECONDS.second)}
  />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.seconds}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'seconds')}
  />
  <BaseButton
    variant="flat"
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.second)}
  />
  <span class="time-label">S</span>
</div>

<style lang="scss">
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time-units {
    font-family: var(--font-main);
    font-size: 2.5rem;
    text-align: center;
    max-width: 4rem;
    background-color: transparent;
    border-color: transparent;
  }

  .time-label {
    font-family: var(--font-main);
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  .separator {
    font-size: 2.5rem;
    margin-top: 2.6875rem;
  }
</style>
