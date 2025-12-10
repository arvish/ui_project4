<script>
</script>

<main>
    <slot />
</main>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        background: #0e1525;
        color: #ffffff;
        font-family: "Inter", system-ui, sans-serif;
    }

    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 4rem;
    }
</style>
