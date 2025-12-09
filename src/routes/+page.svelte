<script lang="ts">
  import ClockFace from '$lib/components/ClockFace.svelte';
  import ActivityBars from '$lib/components/ActivityBars.svelte';
  import ModeSwitcher from '$lib/components/ModeSwitcher.svelte';
</script>

<div class="flex flex-col items-center justify-center gap-8 py-10">
  <ClockFace />

  <ActivityBars />

  <ModeSwitcher />
</div>
