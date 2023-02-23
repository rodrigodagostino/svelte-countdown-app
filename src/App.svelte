<script lang="ts">
  import svelteLogo from './assets/images/svelte-logo.svg'
  import CountdownTimer from './lib/CountdownTimer.svelte'
</script>

<main class="app-main">
  <div class="container">
    <CountdownTimer />
  </div>
</main>
<footer class="app-footer">
  <div class="container">
    <a
      href="https://github.com/rodrigodagostino/svelte-countdown-app"
      target="_blank"
      rel="noreferrer"
    >
      Made with <img src={svelteLogo} alt="Svelte.js logo" /> by Rodrigo D’Agostino
    </a>
  </div>
</footer>

<style lang="scss">
  .container {
    max-width: 54rem;
    margin: 0 auto;
    padding: 1rem;
    position: relative;
  }

  .app-main {
    margin-top: 24vh;
  }

  .app-footer {
    font-size: 0.875rem;
    text-align: center;
    margin-top: auto;

    .container {
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }

    a {
      color: var(--gray-400);
      text-decoration: none;
      transition: color 0.24s ease;

      &:focus,
      &:hover {
        color: var(--gray-600);
      }
    }

    img {
      height: 1.25rem;
      width: auto;
      vertical-align: middle;
      margin: 0 0.25rem;
      display: inline-block;
    }
  }
</style>
