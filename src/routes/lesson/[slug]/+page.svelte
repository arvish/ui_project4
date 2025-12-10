<script lang="ts">
	import { page } from '$app/stores';

	type Option = { text: string; correct: boolean };
	type Question = { text: string; options: Option[] };

	type ModuleId = 'budget' | 'credit' | 'loans' | 'investing';

	const questionBank: Record<ModuleId, Question[]> = {
		budget: [
			{
				text: 'Which of these is a fixed monthly expense?',
				options: [
					{ text: 'Streaming subscription', correct: true },
					{ text: 'Groceries', correct: false },
					{ text: 'Buying clothes', correct: false }
				]
			},
			{
				text: 'Which category should an emergency fund belong to?',
				options: [
					{ text: 'Entertainment', correct: false },
					{ text: 'Savings', correct: true },
					{ text: 'Impulse purchases', correct: false }
				]
			}
		],
		credit: [
			{
				text: 'What does APR stand for on a credit card?',
				options: [
					{ text: 'Annual Percentage Rate', correct: true },
					{ text: 'Average Payment Ratio', correct: false },
					{ text: 'Annual Payment Requirement', correct: false }
				]
			},
			{
				text: 'Which action is usually BEST for your credit score?',
				options: [
					{ text: 'Paying at least the minimum on time', correct: true },
					{ text: 'Maxing out your card each month', correct: false },
					{ text: 'Closing your oldest credit card', correct: false }
				]
			}
		],
		loans: [
			{
				text: 'What is interest on a loan?',
				options: [
					{ text: 'A fee you pay to borrow money', correct: true },
					{ text: 'A bonus your bank gives you', correct: false },
					{ text: 'The total price of the loan', correct: false }
				]
			},
			{
				text: 'Which loan usually has the lowest interest rate?',
				options: [
					{ text: 'Payday loan', correct: false },
					{ text: 'Credit card cash advance', correct: false },
					{ text: 'Federal student loan', correct: true }
				]
			}
		],
		investing: [
			{
				text: 'What is diversification in investing?',
				options: [
					{ text: 'Putting all your money into one stock', correct: false },
					{ text: 'Spreading investments across different assets', correct: true },
					{ text: 'Only investing in cash', correct: false }
				]
			},
			{
				text: 'Which option is MOST appropriate for long-term growth?',
				options: [
					{ text: 'High-yield savings account', correct: false },
					{ text: 'Stock index fund', correct: true },
					{ text: 'Keeping cash under a mattress', correct: false }
				]
			}
		]
	};

	// --- state ---
	let moduleId: ModuleId = 'budget';
	let questions: Question[] = questionBank['budget'];

	let index: number = 0;
	let selected: number | null = null;
	let locked: boolean = false;
	let score: number = 0;
	let quizComplete: boolean = false;

	// react to URL /lesson/[slug]
	$: {
		const slug = $page.params.slug as ModuleId | undefined;
		const nextId: ModuleId = slug && slug in questionBank ? slug : 'budget';

		if (nextId !== moduleId) {
			moduleId = nextId;
			questions = questionBank[moduleId];
			index = 0;
			selected = null;
			locked = false;
			score = 0;
			quizComplete = false;
		}
	}

	function choose(i: number): void {
		if (locked) return;

		selected = i;
		locked = true;

		if (questions[index].options[i].correct) {
			score += 1;
		}
	}

	function next(): void {
		if (selected === null) return;

		if (index < questions.length - 1) {
			index += 1;
			selected = null;
			locked = false;
		} else {
			quizComplete = true;
		}
	}

	function restart(): void {
		index = 0;
		selected = null;
		locked = false;
		score = 0;
		quizComplete = false;
	}
</script>

<div class="lesson-page">
	{#if !quizComplete}
		<section class="quiz-card">
			<header class="quiz-header">
				<h2>
					{#if moduleId === 'budget'}Budget Basics{/if}
					{#if moduleId === 'credit'}Credit Score 101{/if}
					{#if moduleId === 'loans'}Interest &amp; Loans{/if}
					{#if moduleId === 'investing'}Saving &amp; Investing{/if}
				</h2>
				<p class="question-counter">
					Question {index + 1} of {questions.length}
				</p>
				<p class="question-text">{questions[index].text}</p>
			</header>

			<div class="options">
				{#each questions[index].options as opt, i}
					<button
						class={`option ${
							locked && opt.correct ? 'option-correct' : ''
						} ${
							locked && selected === i && !opt.correct ? 'option-wrong' : ''
						}`}
						on:click={() => choose(i)}
						disabled={locked}
					>
						{opt.text}
					</button>
				{/each}
			</div>

			<footer class="quiz-footer">
				<button
					class="next-btn"
					on:click={next}
					disabled={selected === null}
				>
					Next
				</button>
			</footer>
		</section>
	{:else}
		<section class="quiz-card">
			<header class="quiz-header">
				<h2>Lesson complete</h2>
				<p class="question-text">
					You scored <strong>{score}</strong> out of {questions.length}.
				</p>
			</header>

			<div class="results">
				<div class="progress-bar">
					<div
						class="progress-fill"
						style={`width: ${(score / questions.length) * 100}%`}
					/>
				</div>
				<p class="progress-label">
					{Math.round((score / questions.length) * 100)}% correct
				</p>
			</div>

			<footer class="quiz-footer buttons-row">
				<button class="secondary-btn" on:click={restart}>Retry lesson</button>
				<button class="next-btn" on:click={() => (window.location.href = '/')}>
					Back to home
				</button>
			</footer>
		</section>
	{/if}
</div>

<style>
	.lesson-page {
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
	}

	.quiz-card {
		max-width: 640px;
		width: 100%;
		background: #111827;
		color: #f9fafb;
		border-radius: 18px;
		padding: 2.5rem 2.25rem;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
	}

	.quiz-header h2 {
		margin: 0 0 0.25rem;
		font-size: 1.8rem;
	}

	.question-counter {
		margin: 0 0 0.75rem;
		color: #9ca3af;
		font-size: 0.9rem;
	}

	.question-text {
		margin: 0 0 2rem;
		color: #d1d5db;
		line-height: 1.5;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.option {
		width: 100%;
		padding: 1rem 1.25rem;
		border-radius: 10px;
		border: none;
		background: #e5e7eb;
		color: #111827;
		text-align: left;
		font-size: 1rem;
		cursor: pointer;
		transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
	}

	.option:hover:enabled {
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	}

	.option:disabled {
		cursor: default;
	}

	.option-correct {
		background: #16a34a;
		color: #f9fafb;
	}

	.option-wrong {
		background: #dc2626;
		color: #f9fafb;
	}

	.quiz-footer {
		margin-top: 1.75rem;
		display: flex;
		justify-content: flex-end;
	}

	.buttons-row {
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.next-btn,
	.secondary-btn {
		border-radius: 999px;
		padding: 0.7rem 1.6rem;
		font-size: 0.95rem;
		border: none;
		cursor: pointer;
		transition: background 0.12s ease, transform 0.08s ease, opacity 0.12s ease;
	}

	.next-btn {
		background: #2563eb;
		color: #f9fafb;
	}

	.next-btn:hover:enabled {
		background: #1d4ed8;
		transform: translateY(-1px);
	}

	.next-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.secondary-btn {
		background: transparent;
		color: #e5e7eb;
		border: 1px solid #4b5563;
	}

	.secondary-btn:hover {
		background: #1f2937;
	}

	.results {
		margin-top: 0.5rem;
	}

	.progress-bar {
		width: 100%;
		height: 10px;
		border-radius: 999px;
		background: #1f2937;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #22c55e;
	}

	.progress-label {
		margin-top: 0.5rem;
		color: #9ca3af;
		font-size: 0.9rem;
	}
</style>
