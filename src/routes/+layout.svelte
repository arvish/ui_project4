<script lang="ts">
    let { children } = $props();
</script>

<!-- Background Container -->
<div class="min-h-screen bg-black text-white flex flex-col">
    {@render children()}
</div>

<!-- Spline Background -->
<div class="absolute inset-0 -z-10 opacity-40">
    <iframe
        src="https://my.spline.design/glassui-demo?embed=true"
        frameborder="0"
        title="Glass UI Background Scene"
        class="w-full h-full"
    ></iframe>
</div>

<!-- Foreground Content Slot -->
<div class="min-h-screen text-white relative">
    {@render children()}
</div>

<!-- Bottom Navigation -->
<nav class="p-4 text-sm flex justify-between opacity-70">
    <a href="/">Clock</a>
    <div class="flex gap-4">
        <a href="/settings">Settings</a>
        <a href="/profile">Profile</a>
    </div>
</nav>
