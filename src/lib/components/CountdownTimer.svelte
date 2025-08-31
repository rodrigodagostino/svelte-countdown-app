<script lang="ts">
  import { pauseTimer, resetTimer, startTimer, timer } from '../../store';

  import Button from './Button.svelte';
  import CountdownTimerDisplay from './CountdownTimerDisplay.svelte';
  import CountdownProgressRing from './CountdownTimerProgressRing.svelte';
  import buzzer from '../assets/audio/ding-dong.wav';

  let audioRef: HTMLAudioElement;

  $: if ($timer.currentTime <= 0 && $timer.status === 'running') {
    audioRef.play();
  }

  const toggleTimerAction = () => ($timer.status === 'idle' ? startTimer() : pauseTimer());
</script>

<form class="countdown" on:submit|preventDefault={toggleTimerAction}>
  <div class="countdown-tracking row">
    <CountdownProgressRing diameter={300} strokeWidth={16} />
    <CountdownTimerDisplay />
  </div>
  <div class="countdown-actions row">
    <Button variant="flat" icon="undo" on:click={resetTimer} />
    <Button
      type="submit"
      variant="flat"
      size="medium"
      icon={$timer.status === 'idle' ? 'play' : 'pause'}
      isActive={$timer.status === 'running'}
    />
  </div>
  <audio controls bind:this={audioRef}>
    <source src={buzzer} type="audio/wav" />
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
