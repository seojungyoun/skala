<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/prac4')
}
</script>

<template>
  <main class="not-found">
    <div class="not-found-card">
      <h1>☀️ ❓</h1>

      <h2>
        페이지를 찾을 수 없습니다.
      </h2>

      <p>
        요청하신 주소가 존재하지 않습니다.
      </p>

      <button @click="goHome">
        날씨 메인으로 이동
      </button>
    </div>
  </main>
</template>

<style scoped>
.not-found {
    width: 100%;
    margin: 0;
}

.not-found-card {
    padding: 40px 20px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-align: center;
}
</style>