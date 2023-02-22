<script lang="ts">
  import Icon from './Icon.svelte'

  export let href = null
  export let target: '_self' | '_blank' = '_self'
  export let type: 'button' | 'submit' = 'button'
  export let variant: 'fill' | 'flat' = 'flat'
  export let size: 'small' | 'medium' | 'large' = 'small'
  export let icon: 'chevron-down' | 'chevron-up' | 'pause' | 'play' | 'undo' =
    null

  const tag = href ? 'a' : 'button'
</script>

<svelte:element
  this={tag}
  class={`button button--${variant} button--${size}`}
  {href}
  target={target !== '_self' ? target : null}
  type={tag === 'button' ? type : null}
  on:click
>
  {#if icon}
    <Icon {icon} {size} />
  {/if}
  {#if $$props.slot}
    <span class="button__text">
      <slot />
    </span>
  {/if}
</svelte:element>

<style lang="scss">
  .button {
    font-family: var(--font-main);
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 0.75em;
    padding: 0.875em 1em;
    outline: none;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    transition: color 0.24s ease, box-shadow 0.12s ease;

    &--fill {
      background-color: var(--gray-100);
      box-shadow: -0.25em -0.25em 0.5em 0.125em rgba(255, 255, 255, 0.6),
        inset 1px 1px 1px rgba(255, 255, 255, 0.6),
        /* The next line is only used to allow the box-shadow transition to work */
          inset 0.125em 0.125em 0.5em transparent,
        inset -1px -1px 1px rgba(0, 0, 0, 0.05),
        inset -2px -2px 16px -0.5rem rgba(255, 255, 255, 1),
        0.25em 0.25em 0.5em 0.125em rgba(0, 0, 0, 0.15);

      &:focus,
      &:hover {
        color: var(--emerald-400);
      }

      &:active {
        box-shadow: -0.125em -0.125em 0.25em 0 rgba(255, 255, 255, 0.6),
          inset 1px 1px 1px rgba(255, 255, 255, 0.6),
          inset 0.125em 0.125em 0.5em rgba(0, 0, 0, 0.1),
          inset -1px -1px 1px rgba(0, 0, 0, 0.1),
          inset -0.125em -0.125em 0.5em rgba(255, 255, 255, 1),
          0.125em 0.125em 0.25em 0 rgba(0, 0, 0, 0.1);
      }
    }

    &--flat {
      &:focus,
      &:hover {
        color: var(--emerald-400);
      }
    }

    &--small {
      font-size: 16px;
    }

    &--medium {
      font-size: 24px;
    }

    &--large {
      font-size: 40px;
    }
  }
</style>
