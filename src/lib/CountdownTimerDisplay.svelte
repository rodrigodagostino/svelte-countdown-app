<script lang="ts">
  import BaseButton from './Button.svelte'

  let currentStatus: 'idle' | 'running' = 'idle'
  let displayedTime = {
    hours: '00',
    minutes: '00',
    seconds: '00',
  }
</script>

<div class="column">
  <BaseButton variant="flat" icon="chevron-up" />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.hours}
    maxlength="2"
    disabled={currentStatus === 'running'}
  />
  <BaseButton variant="flat" icon="chevron-down" />
  <span class="time-label">H</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <BaseButton variant="flat" icon="chevron-up" />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.minutes}
    maxlength="2"
    disabled={currentStatus === 'running'}
  />
  <BaseButton variant="flat" icon="chevron-down" />
  <span class="time-label">M</span>
</div>
<div class="column">
  <div class="separator">:</div>
</div>
<div class="column">
  <BaseButton variant="flat" icon="chevron-up" />
  <input
    type="text"
    class="time-units"
    bind:value={displayedTime.seconds}
    maxlength="2"
    disabled={currentStatus === 'running'}
  />
  <BaseButton variant="flat" icon="chevron-down" />
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
