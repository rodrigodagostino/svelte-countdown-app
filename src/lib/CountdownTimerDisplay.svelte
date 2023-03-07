<script lang="ts">
  import { debounce } from 'lodash'
  import {
    increaseTime,
    decreaseTime,
    pauseTimer,
    setInitialTime,
    setCurrentTime,
    timer,
  } from '../store'
  import Button from './Button.svelte'

  $: displayedTime = {
    hours: formatNumber(Math.floor($timer.currentTime / 1000 / 60 / 60)),
    minutes: formatNumber(Math.floor(($timer.currentTime / 1000 / 60) % 60)),
    seconds: formatNumber(Math.ceil($timer.currentTime / 1000) % 60),
  }

  const setDisplayedTimeAsInitialAndCurrentTime = debounce((event, units) => {
    const targetValue = event.currentTarget.value
    const hoursInMS = displayedTime.hours * MILLISECONDS.HOUR
    const minutesInMS = displayedTime.minutes * MILLISECONDS.MINUTE
    const secondsInMS = displayedTime.seconds * MILLISECONDS.SECOND
    let totalInMS = 0
    switch (units) {
      case 'hours':
        totalInMS = targetValue * MILLISECONDS.HOUR + minutesInMS + secondsInMS
        break
      case 'minutes':
        totalInMS = hoursInMS + targetValue * MILLISECONDS.MINUTE + secondsInMS
        break
      case 'seconds':
        totalInMS = hoursInMS + minutesInMS + targetValue * MILLISECONDS.SECOND
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
    HOUR: 3600000,
    MINUTE: 60000,
    SECOND: 1000,
  }
</script>

<div class="column">
  <Button icon="chevron-up" on:click={() => increaseTime(MILLISECONDS.HOUR)} />
  <input
    type="text"
    class="time-units"
    value={displayedTime.hours}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'hours')}
  />
  <Button
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.HOUR)}
  />
  <span class="time-label">H</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <Button
    icon="chevron-up"
    on:click={() => increaseTime(MILLISECONDS.MINUTE)}
  />
  <input
    type="text"
    class="time-units"
    value={displayedTime.minutes}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'minutes')}
  />
  <Button
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.MINUTE)}
  />
  <span class="time-label">M</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <Button
    icon="chevron-up"
    on:click={() => increaseTime(MILLISECONDS.SECOND)}
  />
  <input
    type="text"
    class="time-units"
    value={displayedTime.seconds}
    maxlength="2"
    disabled={$timer.status === 'running'}
    on:focus={(e) => e.currentTarget.select()}
    on:keydown={checkIsNumber}
    on:input={(e) => setDisplayedTimeAsInitialAndCurrentTime(e, 'seconds')}
  />
  <Button
    icon="chevron-down"
    on:click={() => decreaseTime(MILLISECONDS.SECOND)}
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
    max-width: 3.5rem;
    margin: 0 0.25rem;
    border-radius: 0.75rem;
    background-color: transparent;
    border-color: transparent;

    &:focus-visible {
      outline: none;
    }
  }

  .time-label {
    font-family: var(--font-main);
    font-size: 0.875rem;
    text-transform: uppercase;
    cursor: default;
  }

  .separator {
    font-size: 2.5rem;
    margin-top: 2.6875rem;
    cursor: default;
  }
</style>
