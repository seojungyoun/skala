<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/prac4')
}
</script>

<template>
  <main class="about-wrapper">
    <h2>ℹ️ 서비스 소개</h2>

    <p>
      Vue Router를 활용하여 지역별 날씨와
      상세 정보를 확인하는 실습입니다.
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
.about-wrapper {
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