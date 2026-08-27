<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/prac4')
}
</script>

<template>
  <main class="guide-wrapper">
    <h2>📖 이용 가이드</h2>

    <p>
      검색창에서 도시를 검색하고,
      상세보기 버튼으로 상세 날씨를 확인할 수 있습니다.
    </p>

    <button
      class="back-button"
      @click="goHome"
    >
      메인 대시보드로 돌아가기
    </button>
  </main>
</template>

<style scoped>
.guide-wrapper {
    width: 90%;
    max-width: 800px;
    margin: 30px auto;
    padding: 16px;
    color: #334155;
}

.back-button {
    margin-top: 24px;
    padding: 12px 20px;

    border: none;
    border-radius: 8px;

    background-color: #2563eb;
    color: white;

    font-size: 15px;
    font-weight: 600;

    cursor: pointer;
}

.back-button:hover {
    background-color: #1d4ed8;
}
</style>