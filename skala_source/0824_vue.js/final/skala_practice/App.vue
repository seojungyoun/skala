<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import Practice1 from './prac_1/WeatherMockup.vue'
import Practice2 from './prac_2/WeatherComposition.vue'
import Practice3 from './prac_3/WeatherParent.vue'

const practice = ref(1)
const router = useRouter()

// 종합실습 전환
const changePractice = (number) => {
    practice.value = number

    if (number === 4) {
        router.push('/prac4')
    } else if (number === 5) {
        router.push('/prac5')
    } else if (number === 6) {
        router.push('/prac6')
    } else if (number === 7) {
        router.push('/prac7')
    }
}
</script>

<template>
  <div class="app-shell">
    <!-- 종합실습 선택 버튼 -->
    <nav class="practice-nav">
      <button
        :class="{ active: practice === 1 }"
        @click="changePractice(1)"
      >
        종합실습 1
      </button>

      <button
        :class="{ active: practice === 2 }"
        @click="changePractice(2)"
      >
        종합실습 2
      </button>

      <button
        :class="{ active: practice === 3 }"
        @click="changePractice(3)"
      >
        종합실습 3
      </button>

      <button
        :class="{ active: practice === 4 }"
        @click="changePractice(4)"
      >
        종합실습 4
      </button>

      <button
        :class="{ active: practice === 5 }"
        @click="changePractice(5)"
      >
        종합실습 5
      </button>

      <button
        :class="{ active: practice === 6 }"
        @click="changePractice(6)"
      >
        종합실습 6
      </button>

      <button
        :class="{ active: practice === 7 }"
        @click="changePractice(7)"
      >
        종합실습 7
      </button>
    </nav>

    <!-- 종합실습 1 -->
    <Practice1
      v-if="practice === 1"
    />

    <!-- 종합실습 2 -->
    <Practice2
      v-else-if="practice === 2"
    />

    <!-- 종합실습 3 -->
    <Practice3
      v-else-if="practice === 3"
    />

    <!-- 종합실습 4 -->
    <div
      v-else-if="practice === 4"
      class="practice-layout"
    >
      <h2>
        🌤️ 과제 4: 라우터적용
      </h2>

      <nav class="weather-nav">
        <RouterLink to="/prac4">
          🌤️ 날씨 대시보드
        </RouterLink>

        <RouterLink to="/prac4/about">
          ℹ️ 서비스 소개
        </RouterLink>

        <RouterLink to="/prac4/guide">
          📖 이용 가이드
        </RouterLink>
      </nav>

      <RouterView />
    </div>

    <!-- 종합실습 5 -->
    <div
      v-else-if="practice === 5"
      class="practice-layout"
    >
      <h2>
        🌤️ 종합실습 5: 스토어적용
      </h2>

      <nav class="weather-nav">
        <RouterLink to="/prac5">
          🌤️ 날씨 대시보드
        </RouterLink>

        <RouterLink to="/prac5/about">
          ℹ️ 서비스 소개
        </RouterLink>
      </nav>

      <RouterView />
    </div>

    <!-- 종합실습 6 -->
    <div
      v-else-if="practice === 6"
      class="practice-layout"
    >
      <h2>
        🌤️ 종합실습 6: Axios 적용
      </h2>

      <nav class="weather-nav">
        <RouterLink to="/prac6">
          🌤️ 날씨 대시보드
        </RouterLink>

        <RouterLink to="/prac6/about">
          ℹ️ 서비스 소개
        </RouterLink>
      </nav>

      <RouterView />
    </div>

    <!-- 종합실습 7 -->
    <div
      v-else-if="practice === 7"
      class="practice-layout"
    >
      <h2>
        🌤️ 종합실습 7: UI Library
      </h2>

      <nav class="weather-nav">
        <RouterLink to="/prac7">
          🌤️ 날씨 대시보드
        </RouterLink>

        <RouterLink to="/prac7/about">
          ℹ️ 서비스 소개
        </RouterLink>
      </nav>

      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-shell {
    width: 100%;
}

/* 종합실습 선택 버튼 */
.practice-nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;

    margin: 18px auto 28px;
    padding: 0 16px;
}

.practice-nav button {
    padding: 8px 14px;

    border: 1px solid #cbd5e1;
    border-radius: 7px;

    background-color: #ffffff;
    color: #475569;

    font-size: 13px;
    font-weight: bold;

    cursor: pointer;
}

.practice-nav button:hover {
    border-color: #93c5fd;
    background-color: #eff6ff;
    color: #2563eb;
}

.practice-nav button.active {
    border-color: #2563eb;
    background-color: #eff6ff;
    color: #2563eb;
}

/* 4~7번 공통 레이아웃 */
.practice-layout {
    width: 90%;
    max-width: 800px;

    margin: 0 auto 40px;

    color: #334155;
}

.practice-layout > h2 {
    margin: 0 0 16px;

    font-size: 22px;
}

/* Router 상단 탭 */
.weather-nav {
    display: flex;
    justify-content: center;
    gap: 12px;

    margin-bottom: 18px;
    padding: 10px 0;

    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
}

.weather-nav a {
    padding: 7px 12px;

    border-radius: 6px;

    color: #64748b;

    font-size: 12px;
    font-weight: bold;

    text-decoration: none;
}

.weather-nav a:hover {
    background-color: #f1f5f9;
}

.weather-nav a.router-link-active {
    background-color: #eff6ff;
    color: #2563eb;
}
</style>