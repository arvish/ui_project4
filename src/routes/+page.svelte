<script lang="ts">
	type ModuleId = 'budget' | 'credit' | 'loans' | 'investing';

	type ModuleCard = {
		id: ModuleId;
		title: string;
		subtitle: string;
	};

	const modules: ModuleCard[] = [
		{ id: 'budget', title: 'Budget Basics', subtitle: 'Beginner Level' },
		{ id: 'credit', title: 'Credit Score 101', subtitle: 'Coming Soon' },
		{ id: 'loans', title: 'Interest & Loans', subtitle: 'Coming Soon' },
		{ id: 'investing', title: 'Saving & Investing', subtitle: 'Coming Soon' }
	];

	function openModule(id: ModuleId) {
		window.location.href = `/lesson/${id}`;
	}
</script>

<div class="home">
	<header class="hero">
		<h1>FinanceLing</h1>
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
	.home {
		text-align: center;
		color: #f9fafb;
		padding-top: 3rem;
	}

	.hero h1 {
		font-size: 2.6rem;
		font-weight: 700;
		margin: 0;
	}

	.hero p {
		margin-top: 0.4rem;
		margin-bottom: 2.8rem;
		color: #9ca3af;
	}

	.modules {
		max-width: 960px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.75rem;
		justify-items: center;
	}

	.card {
		width: 230px;
		padding: 1.5rem 1.3rem;
		background: #111827;
		border-radius: 16px;
		box-shadow: 0 12px 26px rgba(0, 0, 0, 0.45);
		cursor: pointer;
		transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
		text-align: left;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55);
		background: #101725;
	}

	.card h3 {
		margin: 0 0 0.35rem;
		font-size: 1.2rem;
	}

	.card p {
		margin: 0;
		color: #9ca3af;
		font-size: 0.92rem;
	}
</style>
