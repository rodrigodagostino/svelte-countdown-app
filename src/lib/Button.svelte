<script lang="ts">
  import Icon from './Icon.svelte'

  export let href: string = null
  export let target: '_self' | '_blank' = '_self'
  export let type: 'button' | 'submit' = 'button'
  export let variant: 'fill' | 'flat' = 'flat'
  export let size: 'small' | 'medium' | 'large' = 'small'
  export let icon: 'chevron-down' | 'chevron-up' | 'pause' | 'play' | 'undo' =
    null
</script>

{#if href}
  <a class={`button button--${variant} button--${size}`} {href} {target}>
    {#if icon}
      <Icon {icon} {size} />
    {/if}
    {#if $$slots.default}
      <span class="button__text">
        <slot />
      </span>
    {/if}
  </a>
{:else}
  <button class={`button button--${variant} button--${size}`} {type} on:click>
    {#if icon}
      <Icon {icon} {size} />
    {/if}
    {#if $$slots.default}
      <span class="button__text">
        <slot />
      </span>
    {/if}
  </button>
{/if}

<style lang="scss">
  .button {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    padding: 0.875em 1em;
    border: none;
    border-radius: 0.75em;
    outline: none;
    font-family: var(--font-main);
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.24s, box-shadow 0.12s;
    cursor: pointer;

    &:focus-visible {
      outline: 3px dashed currentColor;
    }

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
        color: var(--emerald-500);
      }
    }

    &--small {
      font-size: 1rem;
    }

    &--medium {
      font-size: 1.5rem;
    }

    &--large {
      font-size: 2.5rem;
    }
  }
</style>
