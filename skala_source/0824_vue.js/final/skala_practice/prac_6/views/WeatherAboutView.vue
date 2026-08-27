<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/prac6')
}
</script>

<template>
  <main class="about-wrapper">
    <h2>ℹ️ 서비스 소개</h2>

    <p>
      Pinia를 활용하여 날씨 단위를
      섭씨와 화씨로 전환할 수 있는
      날씨 대시보드입니다.
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
.about-box {
    padding: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    background-color: #f8fafc;
}

.about-box h3 {
    margin-top: 0;
}

.about-box p {
    line-height: 1.7;
}

.about-box button {
    margin-top: 10px;
    padding: 8px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: #ffffff;
    color: #334155;
    cursor: pointer;
}

.about-box button:hover {
    background-color: #f1f5f9;
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