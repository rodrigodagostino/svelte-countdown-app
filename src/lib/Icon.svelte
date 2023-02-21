<script lang="ts">
  import ChevronDown from './Icon/ChevronDown.svelte'
  import ChevronUp from './Icon/ChevronUp.svelte'
  import Pause from './Icon/Pause.svelte'
  import Play from './Icon/Play.svelte'
  import Undo from './Icon/Undo.svelte'

  export let icon: 'chevron-down' | 'chevron-up' | 'pause' | 'play' | 'undo'
  export let size: 'small' | 'medium' | 'large'

  const iconComponents = {
    'chevron-down': ChevronDown,
    'chevron-up': ChevronUp,
    pause: Pause,
    play: Play,
    undo: Undo,
  }

  const sizeInNumbers = {
    small: '1rem',
    medium: '1.5rem',
    large: '2.5rem',
  }
</script>

<svelte:component this={iconComponents[icon]} size={sizeInNumbers[size]} />
