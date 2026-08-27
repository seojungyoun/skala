<script setup>
defineProps({
    message: {
        type: String,
        default: '',
    },
})
</script>

<template>
  <div class="status-bar">
    {{ message }}
  </div>
</template>

<style scoped>
.status-bar {
    margin-top: 12px;
    padding: 12px;

    border: 1px solid #bbf7d0;
    border-radius: 6px;

    background-color: #dcfce7;
    color: #166534;

    font-size: 13px;
    font-weight: bold;

    text-align: center;
}
</style>