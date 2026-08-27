<script setup>
// 부모에게서 상태 메시지 전달받기
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