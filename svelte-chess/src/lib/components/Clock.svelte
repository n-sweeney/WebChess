<script lang="ts">
	export let paused = false;
	export let reset = false;
	let elapsed = 0;
	let gameTimer: number | null = null;

	function startGameTimer() {
		if (gameTimer) return;
		elapsed = 0;
		gameTimer = setInterval(() => {
			elapsed++;
		}, 1000);
	}

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	$: if (!paused) startGameTimer();

	$: if (paused && gameTimer !== null) {
		clearInterval(gameTimer);
		gameTimer = null;
		reset = false;
		elapsed = 0;
	}

	$: if (reset && gameTimer !== null) {
		clearInterval(gameTimer);
		gameTimer = null;
		elapsed = 0;
		reset = false;
		startGameTimer();
	}
</script>

<div class="text-m px-4 py-2 text-center text-white">
	Elapsed Time: {formatTime(elapsed)}
</div>
