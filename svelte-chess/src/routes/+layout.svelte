<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<NavBar />

<main class="min-h-screen p-4 bg-[#242424] text-white">
	{@render children()}
</main>
