<script lang="ts">
	type ModuleId = 'budget' | 'credit' | 'loans' | 'investing';

	type ModuleCard = {
		id: ModuleId;
		title: string;
		subtitle: string;
	};

	const modules: ModuleCard[] = [
		{ id: 'budget', title: 'Budget Basics', subtitle: 'Beginner Level' },
		{ id: 'credit', title: 'Credit Score 101', subtitle: 'Intermediate Level' },
		{ id: 'loans', title: 'Interest & Loans', subtitle: 'Intermediate Level' },
		{ id: 'investing', title: 'Saving & Investing', subtitle: 'Advanced Level' }
	];

	function openModule(id: ModuleId) {
		window.location.href = `/lesson/${id}`;
	}
</script>

<div class="home">

	<header class="hero">
		<h1>FinanceLingo</h1>
		<p>A simple daily financial literacy trainer.</p>
	</header>

	<section class="modules">
		{#each modules as m}
			<div class="card" on:click={() => openModule(m.id)}>
				<h3>{m.title}</h3>
				<p>{m.subtitle}</p>
			</div>
		{/each}
	</section>
</div>

<style>

	/* --------------------------- */
	/*  GLOBAL PAGE BACKGROUND     */
	/* --------------------------- */
	:global(body) {
		margin: 0;
		padding: 0;
		background: radial-gradient(circle at 30% 20%, #1f2937 0%, #0f172a 70%, #0a0f1a 100%);
		font-family: 'Inter', system-ui, sans-serif;
		overflow-x: hidden;
	}

	.home {
		text-align: center;
		color: #f9fafb;
		padding-top: 4rem;
		padding-bottom: 4rem;
	}

	/* --------------------------- */
	/*        HERO SECTION         */
	/* --------------------------- */
	.hero h1 {
		font-size: 3rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.hero p {
		margin-top: 0.5rem;
		margin-bottom: 3rem;
		color: #cbd5e1;
		font-size: 1.1rem;
	}

	/* --------------------------- */
	/*       MODULAR GRID          */
	/* --------------------------- */
	.modules {
		max-width: 920px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 2.2rem;
		justify-items: center;
	}

	.card {
    width: 260px;
    padding: 1.8rem 1.4rem;

    /* Stronger glass effect */
    background: rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(26px) saturate(230%);
    -webkit-backdrop-filter: blur(26px) saturate(230%);
    border: 1.5px solid rgba(255, 255, 255, 0.22);

    border-radius: 20px;

    /* Depth shadows */
    box-shadow:
        0 8px 28px rgba(0, 0, 0, 0.45),
        inset 0 0 40px rgba(255, 255, 255, 0.05);

    cursor: pointer;

    /* Stronger micro-interaction */
    transition:
        transform 0.22s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.22s ease,
        background 0.22s ease,
        border 0.22s ease;
    }

    .card:hover {
        /* Slight lift & tilt */
        transform: translateY(-8px) scale(1.025);

        /* Highlighted glass */
        background: rgba(255, 255, 255, 0.22);
        border: 1.5px solid rgba(255, 255, 255, 0.32);

        /* Enhanced glow */
        box-shadow:
            0 16px 46px rgba(0, 0, 0, 0.55),
            0 0 22px rgba(255, 255, 255, 0.18),
            inset 0 0 55px rgba(255, 255, 255, 0.08);
    }

	.card h3 {
		margin: 0 0 0.45rem;
		font-size: 1.35rem;
		font-weight: 600;
		color: #f1f5f9;
	}

	.card p {
		margin: 0;
		color: #d1d5db;
		font-size: 1rem;
	}

</style>
