<template>
  <!-- 공통 대시보드 카드 -->
  <div class="dashboard-card">
    <slot />
  </div>
</template>

<style scoped>
.dashboard-card {
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
}
</style>