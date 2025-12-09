<script lang="ts">
	let modules = [
		{
			title: "Budget Basics",
			subtitle: "Beginner Level",
			unlocked: true,
			href: "/lesson",
			icon: "📝"
		},
		{
			title: "Credit Score 101",
			subtitle: "Coming Soon",
			unlocked: false,
			icon: "💳"
		},
		{
			title: "Interest & Loans",
			subtitle: "Coming Soon",
			unlocked: false,
			icon: "💰"
		},
		{
			title: "Saving & Investing",
			subtitle: "Coming Soon",
			unlocked: false,
			icon: "📈"
		}
	];
</script>

<h1>FinanceLing</h1>
<p class="subtitle">A simple daily financial literacy trainer.</p>
<div class="divider"></div>

<div class="dashboard">
	{#each modules as m}
		<div
			class="card {m.unlocked ? 'unlocked' : 'locked'}"
			on:click={() => m.unlocked && m.href && (window.location.href = m.href)}
		>
			<div class="icon">{m.icon}</div>
			<h3>{m.title}</h3>
			<p>{m.subtitle}</p>
		</div>
	{/each}
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 2rem;
		font-size: 2.2rem;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin-top: 0.3rem;
	}

	.divider {
		width: 140px;
		height: 3px;
		background: #eee;
		margin: 1rem auto 2rem auto;
		border-radius: 4px;
	}

	.dashboard {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 2rem;
		max-width: 900px;
		margin: 3rem auto;
	}

	.card {
		background: white;
		padding: 1.5rem;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		text-align: center;
		transition: 0.25s ease;
		cursor: not-allowed;
	}

	.card.unlocked {
		cursor: pointer;
	}

	.card.unlocked:hover {
		transform: translateY(-6px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
	}

	.card.locked {
		opacity: 0.55;
	}

	.icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	.card h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	.card p {
		margin-top: 0.4rem;
		font-size: 0.9rem;
		color: #555;
	}
</style>
