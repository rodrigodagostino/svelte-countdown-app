<script lang="ts">
  import Icon from './Icon.svelte'

  export let variant: 'flat' | 'text' = 'text'
  export let size: 'small' | 'medium' | 'large' = 'small'
  export let href: string | undefined = undefined
  export let target: '_self' | '_blank' | undefined = href ? '_self' : undefined
  export let type: 'button' | 'submit' | undefined = !href
    ? 'button'
    : undefined
  export let icon: 'chevron-down' | 'chevron-up' | 'pause' | 'play' | 'undo' =
    undefined
  export let isActive: boolean = false

  const element = href ? 'a' : 'button'
</script>

<svelte:element
  this={element}
  class="button button--{variant} button--{size}"
  class:is-active={isActive}
  {href}
  {target}
  {type}
  on:click
>
  {#if icon}
    <Icon {icon} {size} />
  {/if}
  {#if $$slots.default}
    <span class="button__text">
      <slot />
    </span>
  {/if}
</svelte:element>

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
      outline: 3px solid currentColor;
    }

    &--flat {
      background-color: var(--gray-100);
      box-shadow: -0.25em -0.25em 0.5em 0.125em rgba(255, 255, 255, 0.6),
        inset 1px 1px 1px rgba(255, 255, 255, 0.6),
        /* The next line is only used to allow the box-shadow transition to work */
          inset 0.125em 0.125em 0.5em transparent,
        inset -1px -1px 1px rgba(0, 0, 0, 0.075),
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

      &.is-active {
        background: linear-gradient(
          135deg,
          var(--emerald-400),
          var(--teal-500)
        );
        box-shadow: -0.25em -0.25em 0.5em 0.125em rgba(255, 255, 255, 0.6),
          inset 1px 1px 1px rgba(255, 255, 255, 0.6),
          inset 0.125em 0.125em 0.5em rgba(0, 0, 0, 0.05),
          inset -1px -1px 1px rgba(0, 0, 0, 0.075),
          inset -2px -2px 16px -0.5rem rgba(255, 255, 255, 1),
          0.25em 0.25em 0.5em 0.125em rgba(0, 0, 0, 0.15);
        color: var(--white);

        &:focus,
        &:hover {
          color: var(--white-rich);
        }

        &:focus-visible {
          outline: 3px solid var(--emerald-400);
        }

        &:active {
          box-shadow: -0.125em -0.125em 0.25em 0 rgba(255, 255, 255, 0.6),
            inset 1px 1px 1px rgba(255, 255, 255, 0.6),
            inset 0.125em 0.125em 0.5em rgba(0, 0, 0, 0.15),
            inset -1px -1px 1px rgba(0, 0, 0, 0.075),
            inset -0.125em -0.125em 0.5em rgba(255, 255, 255, 0.5),
            0.125em 0.125em 0.25em 0 rgba(0, 0, 0, 0.1);
        }
      }
    }

    &--text {
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
