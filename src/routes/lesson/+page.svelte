<script lang="ts">
    let index: number = 0;
    let selected: number | null = null;
    let show = false;

    const questions = [
        {
            text: "Which of these is a fixed monthly expense?",
            options: [
                { text: "Streaming subscription", correct: true },
                { text: "Groceries", correct: false },
                { text: "Buying clothes", correct: false }
            ]
        },
        {
            text: "What does APR stand for?",
            options: [
                { text: "Annual Percentage Rate", correct: true },
                { text: "Average Personal Revenue", correct: false },
                { text: "Adjusted Payment Ratio", correct: false }
            ]
        }
    ];

    function choose(i: number) {
        selected = i;
        show = true;
    }

    function next() {
        if (index < questions.length - 1) {
            index++;
            selected = null;
            show = false;
        } else {
            window.location.href = "/complete";
        }
    }
</script>

<div class="quiz-box">
    <h2>Question {index + 1} of {questions.length}</h2>
    <p class="qtext">{questions[index].text}</p>

    <div class="options">
        {#each questions[index].options as opt, i}
            <button
                class="option"
                style="background: {selected === i && show ? (opt.correct ? '#4CAF50' : '#ca3b3b') : '#e7ecf3'}"
                on:click={() => choose(i)}
            >
                {opt.text}
            </button>
        {/each}
    </div>

    {#if show}
        <button class="next-btn" on:click={next}>Next</button>
    {/if}
</div>

<style>
.quiz-box {
    width: 480px;
    background: #162032;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 26px rgba(0,0,0,0.4);
    text-align: left;
    color: white;
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	.qtext {
		margin-bottom: 1.5rem;
		color: #d2d9e6;
	}

	.option {
		width: 100%;
		padding: 1rem;
		border-radius: 10px;
		border: none;
		margin-bottom: 0.7rem;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
		transition: 0.2s;
		background: #e7ecf3;
		color: #1a1f27;   /* <-- THIS FIXES THE WHITE TEXT PROBLEM */
	}


	.option:hover {
		transform: translateY(-2px);
	}

	.next-btn {
		margin-top: 1rem;
		padding: 0.8rem 1.6rem;
		border-radius: 8px;
		border: none;
		background: #4f7cff;
		color: white;
		cursor: pointer;
		font-size: 1rem;
	}

	.next-btn:hover {
		background: #6b93ff;
	}
</style>
