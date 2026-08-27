<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// 검색어
const searchQuery = ref('')

// 선택한 도시 정보
const selectedCityInfo = ref('')

// 날씨 Mock 데이터
const weatherList = ref([
    {
        id: 1,
        name: '서울',
        temp: 28,
        status: '맑음',
    },
    {
        id: 2,
        name: '수원',
        temp: 24,
        status: '비',
    },
    {
        id: 3,
        name: '부산',
        temp: 26,
        status: '구름',
    },
])

// 검색어에 따라 도시 목록 필터링
const filteredWeatherList = computed(() => {
    const keyword = searchQuery.value.trim()

    // 검색어가 없으면 전체 데이터 출력
    if (!keyword) {
        return weatherList.value
    }

    // 검색어와 일치하는 도시만 출력
    return weatherList.value.filter((city) =>
        city.name.includes(keyword),
    )
})

// 선택된 도시 상태 변경 감시
watch(selectedCityInfo, (newValue, oldValue) => {
    console.log(
        `선택 도시 변경: ${oldValue} → ${newValue}`,
    )
})

// 검색어 변경 자동 추적
watchEffect(() => {
    console.log(
        `현재 검색어: ${searchQuery.value}`,
    )
})

// -------------------------
// 본인만의 추가 기능
// -------------------------

// 추가 반응형 상태
const clickCount = ref(0)

// 추가 Computed
const clickMessage = computed(() => {
    return `카드 클릭 횟수: ${clickCount.value}회`
})

// 추가 Watcher
watch(clickCount, (newValue, oldValue) => {
    console.log(
        `카드 클릭 횟수 변경: ${oldValue} → ${newValue}`,
    )
})

// 카드 클릭
const selectCity = (city) => {
    selectedCityInfo.value = city.name
    clickCount.value++
}

// 상세보기
const showDetail = (city) => {
    window.alert(
        `${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`,
    )
}
</script>

<template>
  <main class="weather-wrapper">
    <h2>🌤️ 과제 2: 날씨 (컴포지션)</h2>

    <!-- 도시 검색 -->
    <section class="search-box">
      <h3>🔍 도시 검색</h3>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="검색할 도시 이름 입력"
      >

      <p>
        검색 중인 도시:
        {{ searchQuery }}
      </p>
    </section>

    <!-- 날씨 목록 -->
    <section class="weather-box">
      <h3>🌐 지역별 날씨 현황</h3>

      <div
        v-for="city in filteredWeatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city)"
      >
        <div>
          <h4>
            {{ city.name }} ({{ city.status }})
          </h4>

          <p>
            현재 기온:
            {{ city.temp }}°C
          </p>

          <span v-if="city.temp >= 25">
            🔥 더움
          </span>

          <span v-else>
            ❄️ 선선함
          </span>
        </div>

        <button
          type="button"
          @click.stop="showDetail(city)"
        >
          상세보기
        </button>
      </div>

      <!-- 검색 결과가 없을 때 -->
      <p v-if="filteredWeatherList.length === 0">
        일치하는 도시가 없습니다.
      </p>
    </section>

    <!-- 선택한 도시 표시 -->
    <div class="status-box">
      <span v-if="selectedCityInfo">
        {{ selectedCityInfo }}이 선택되었습니다.
      </span>

      <span v-else>
        카드를 클릭하거나 검색해 보세요.
      </span>

      <!-- 개인 추가 Computed 결과 -->
      <p>
        {{ clickMessage }}
      </p>
    </div>
  </main>
</template>

<style scoped>
.weather-wrapper {
    width: 90%;
    max-width: 800px;
    margin: 30px auto;
    color: #334155;
}

.search-box,
.weather-box {
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    background-color: #f8fafc;
}

.search-box input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.weather-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: #ffffff;
    cursor: pointer;
}

.weather-card h4 {
    margin: 0 0 8px;
}

.weather-card button {
    padding: 6px 10px;
}

.status-box {
    padding: 12px;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    background-color: #dcfce7;
    text-align: center;
}
</style>