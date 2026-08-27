<script setup>
defineProps({
    message: {
        type: String,
        required: true,
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
    padding: 10px;
    border: 1px solid #bbf7d0;
    border-radius: 4px;
    background-color: #dcfce7;
    color: #166534;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
}
</style>