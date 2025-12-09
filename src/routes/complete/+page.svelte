<div class="container">
	<div class="card">
		<h1>🎉 Lesson Complete!</h1>
		<p>Nice work—you're building real financial knowledge.</p>

		<button on:click={() => window.location.href = "/"}>
			Back to Course Map
		</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		margin-top: 5rem;
	}

	.card {
		background: white;
		padding: 2rem;
		max-width: 500px;
		width: 90%;
		border-radius: 16px;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	button {
		margin-top: 1.5rem;
		padding: 0.7rem 1.5rem;
		border-radius: 8px;
		border: none;
		background: #4b8cff;
		color: white;
		cursor: pointer;
		font-size: 1rem;
	}

	button:hover {
		background: #3c77e6;
	}
</style>
