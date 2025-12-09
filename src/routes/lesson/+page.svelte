<script lang="ts">
	import { questions } from "./questions";

	let index = 0;
	let selected: number | null = null;
	let showAnswer = false;

	function selectOption(i: number) {
		if (!showAnswer) {
			selected = i;
			showAnswer = true;
		}
	}

	function next() {
		if (index < questions.length - 1) {
			index++;
			selected = null;
			showAnswer = false;
		} else {
			window.location.href = "/complete";
		}
	}
</script>

<div class="container">
	<div class="quiz-card">
		<h2>Question {index + 1} of {questions.length}</h2>
		<p class="question">{questions[index].text}</p>

		<div class="options">
			{#each questions[index].options as opt, i}
				<div
					class="option"
					class:correct={selected === i && showAnswer && opt.correct}
					class:wrong={selected === i && showAnswer && !opt.correct}
					on:click={() => selectOption(i)}
				>
					{opt.text}
				</div>
			{/each}
		</div>

		{#if showAnswer}
			<button class="next" on:click={next}>Next</button>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
	}

	.quiz-card {
		background: white;
		padding: 2rem;
		border-radius: 16px;
		max-width: 520px;
		width: 90%;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.question {
		margin: 1rem 0 1.5rem 0;
		font-size: 1.1rem;
		color: #333;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.option {
		padding: 0.9rem;
		border-radius: 10px;
		background: #f7f7f7;
		border: 1px solid #ddd;
		cursor: pointer;
		transition: 0.2s;
	}

	.option:hover {
		background: #efefef;
	}

	.option.correct {
		background: #d4f7d0;
		border-color: #8ad68a;
	}

	.option.wrong {
		background: #f5bcbc;
		border-color: #d48080;
	}

	.next {
		margin-top: 1rem;
		padding: 0.7rem 1.6rem;
		border-radius: 8px;
		border: none;
		background: #4b8cff;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		transition: 0.2s ease;
	}

	.next:hover {
		background: #3c77e6;
	}
</style>
