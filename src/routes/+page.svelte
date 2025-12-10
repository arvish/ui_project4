<script lang="ts">
	let modules = [
		{ title: "Budget Basics", desc: "Beginner Level", href: "/lesson", unlocked: true },
		{ title: "Credit Score 101", desc: "Coming Soon", unlocked: false },
		{ title: "Interest & Loans", desc: "Coming Soon", unlocked: false },
		{ title: "Saving & Investing", desc: "Coming Soon", unlocked: false }
	];
</script>

<div class="container">
    <h1>FinanceLing</h1>
    <p class="subtitle">A simple daily financial literacy trainer.</p>

    <div class="grid">
        {#each modules as m}
            <div 
                class="card {m.unlocked ? 'active' : 'locked'}"
                on:click={() => m.unlocked && m.href && (window.location.href = m.href)}
            >
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
            </div>
        {/each}
    </div>
</div>

<style>
.container {
    text-align: center;
    color: white;
}

h1 {
    font-size: 2.6rem;
    font-weight: 700;
}

.subtitle {
    margin-top: -0.5rem;
    margin-bottom: 3rem;
    color: #b4c2d8;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
}

.card {
    padding: 1.5rem;
    background: rgba(255,255,255,0.04);
    border-radius: 14px;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.5);
    transition: 0.2s ease;
}

.card.active:hover {
    background: rgba(255,255,255,0.12);
    cursor: pointer;
}

.card.locked {
    opacity: 0.4;
    cursor: default;
}

.card h3 {
    margin: 0;
    font-size: 1.3rem;
}

.card p {
    margin-top: 0.3rem;
    color: #b4c2d8;
}
</style>
