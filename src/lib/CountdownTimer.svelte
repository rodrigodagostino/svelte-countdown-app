<script lang="ts">
  import BaseButton from './Button.svelte'
  import CountdownTimerDisplay from './CountdownTimerDisplay.svelte'
  import CountdownProgressRing from './CountdownTimerProgressRing.svelte'
  import countdownBuzzer from '../assets/audio/ding-dong.wav'
</script>

<form class="countdown">
  <div class="countdown-tracking row">
    <CountdownProgressRing diameter={300} strokeWidth={16} />
    <CountdownTimerDisplay />
  </div>
  <div class="countdown-actions row">
    <BaseButton icon="undo" variant="fill" />
    <BaseButton type="submit" icon="play" variant="fill" size="medium" />
  </div>
  <audio controls>
    <source src={countdownBuzzer} type="audio/wav" />
  </audio>
</form>

<style lang="scss">
  .countdown {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }

  .countdown-actions {
    align-items: center;
    gap: 1.5rem;

    &::after {
      content: '';
      width: 3rem;
      height: 2.75rem;
    }
  }

  .row {
    display: flex;
    position: relative;

    &:nth-child(2) {
      margin-top: 5rem;
    }
  }

  audio {
    display: none;
  }
</style>
