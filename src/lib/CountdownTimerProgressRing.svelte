<script lang="ts">
  import { timer } from '../store'

  export let diameter: number = 300
  export let strokeWidth: number = 16

  let strokeDasharray = (diameter - strokeWidth) * Math.PI
  $: strokeDashoffset = !$timer.initialTime
    ? null
    : (strokeDasharray / 100) *
      (100 - ($timer.currentTime * 100) / $timer.initialTime)
  $: trackActiveSegmentTransition = `stroke-dashoffset ${
    $timer.status === 'idle' ? '1s' : '100ms'
  } linear`
</script>

<div class="progress-ring-container">
  <svg class="progress-ring" width={diameter} height={diameter}>
    <defs>
      <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="50%" stop-color="var(--emerald-400)" />
        <stop offset="100%" stop-color="var(--teal-600)" />
      </linearGradient>
    </defs>
    <circle
      class="progress-ring__track"
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDasharray}
      r={diameter / 2 - strokeWidth / 2}
      cx={diameter / 2}
      cy={diameter / 2}
    />
    <circle
      class="progress-ring__track-active-segment"
      style="transition: {trackActiveSegmentTransition}"
      stroke="url(#gradient)"
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDasharray}
      stroke-dashoffset={strokeDashoffset}
      r={diameter / 2 - strokeWidth / 2}
      cx={diameter / 2}
      cy={diameter / 2}
    />
  </svg>
  <div
    class="progress-ring__track-inner-shadow"
    style="width: {diameter - strokeWidth * 2}px; height: {diameter -
      strokeWidth * 2}px"
  />
  <div
    class="progress-ring__track-outer-shadow"
    style="width: {diameter}px; height: {diameter}px"
  />
</div>

<style lang="scss">
  .progress-ring-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    padding: 1rem;
    border-radius: 50%;
    box-shadow: -1rem -1rem 1.5rem 0.125rem rgba(255, 255, 255, 0.6),
      inset 1px 1px 1px rgba(255, 255, 255, 0.6),
      inset -1px -1px 1px rgba(0, 0, 0, 0.05),
      1rem 1rem 1.5rem 0.125rem rgba(0, 0, 0, 0.15);
  }

  .progress-ring {
    vertical-align: middle;

    &__track {
      stroke: rgba(0, 0, 0, 0.1);
      stroke-linecap: round;
      fill: transparent;
    }

    &__track-active-segment {
      stroke-linecap: round;
      fill: transparent;
      transform: rotate(-90deg);
      transform-origin: center;
    }

    &__track-inner-shadow,
    &__track-outer-shadow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: -1;
    }

    &__track-inner-shadow {
      box-shadow: -2px -2px 4px 1px rgba(255, 255, 255, 0.6),
        inset 1px 1px 1px rgba(255, 255, 255, 0.6),
        inset -1px -1px 1px rgba(0, 0, 0, 0.05),
        2px 2px 4px 1px rgba(0, 0, 0, 0.1);
    }

    &__track-outer-shadow {
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.05),
        inset -2px -2px 4px rgba(255, 255, 255, 0.6),
        inset 2px 2px 4px rgba(0, 0, 0, 0.1),
        1px 1px 1px rgba(255, 255, 255, 0.6);
    }
  }
</style>
