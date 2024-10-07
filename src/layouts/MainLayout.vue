<script setup lang="ts">

</script>
<template >
    <div class="p-6 flex items-center gap-3">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/history">History</RouterLink>
    </div>
    <div class="grid place-items-center  w-full">
      <RouterView />
    </div>
</template>

<style >
    
</style>