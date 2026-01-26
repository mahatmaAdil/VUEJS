<template>
  <div style="padding: 20px">
    <nav style="display:flex; gap:12px; margin-bottom: 16px;">
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
