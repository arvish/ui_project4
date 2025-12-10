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
    :global(body) {
    background: linear-gradient(135deg, #0b1220, #0e1a2b, #102035);
    background-size: 180% 180%;
    animation: gradientShift 12s ease infinite;
    margin: 0;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

	.lesson-page {
		display: flex;
		justify-content: center;
		padding: 4rem 1rem;
	}
    
    .quiz-card {
        max-width: 620px;
        margin: 3rem auto;
        padding: 2.4rem 2.6rem;

        background: rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(28px) saturate(240%);
        -webkit-backdrop-filter: blur(28px) saturate(240%);
        
        border-radius: 24px;

        border: 1.6px solid rgba(255, 255, 255, 0.18);

        box-shadow:
            0 22px 40px rgba(0, 0, 0, 0.55),
            0 0 80px rgba(255, 255, 255, 0.05),
            inset 0 0 80px rgba(255, 255, 255, 0.06);

        animation: fadeIn 0.45s ease forwards;
        transform: translateY(10px);
        opacity: 0;

        transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease,
            border 0.35s ease;
    }

    .quiz-card:hover {
        transform: translateY(4px);

        box-shadow:
            0 28px 55px rgba(0, 0, 0, 0.65),
            0 0 110px rgba(255, 255, 255, 0.10),
            inset 0 0 100px rgba(255, 255, 255, 0.10);

        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(255, 255, 255, 0.24);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(10px); }
    }

	.quiz-card h2 {
        margin: 0 0 0.6rem 0;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -0.5px;
        color: #ffffff;
    }

    .quiz-card p.question-text {
        margin: 0 0 1.8rem 0;
        font-size: 1.1rem;
        color: #d2d7df;
        line-height: 1.55;
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
        padding: 1.1rem 1.3rem;

        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(22px) saturate(230%);
        -webkit-backdrop-filter: blur(22px) saturate(230%);
        border: 1.4px solid rgba(255, 255, 255, 0.22);

        border-radius: 14px;

        box-shadow:
            0 8px 26px rgba(0, 0, 0, 0.45),
            inset 0 0 40px rgba(255, 255, 255, 0.04);

        cursor: pointer;

        transition:
            transform 0.22s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.22s ease,
            background 0.22s ease,
            border 0.22s ease;
    }

	.option:hover:enabled {
		transform: translateY(-6px) scale(1.018);

        background: rgba(255, 255, 255, 0.22);
        border: 1.4px solid rgba(255, 255, 255, 0.33);

        box-shadow:
            0 14px 40px rgba(0, 0, 0, 0.55),
            0 0 18px rgba(255, 255, 255, 0.18),
            inset 0 0 50px rgba(255, 255, 255, 0.08);
	}

    .option.selected {
        background: rgba(76, 132, 255, 0.28);
        border-color: rgba(142, 178, 255, 0.55);
        box-shadow:
            0 14px 40px rgba(46, 110, 255, 0.45),
            inset 0 0 60px rgba(255,255,255,0.12);
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
