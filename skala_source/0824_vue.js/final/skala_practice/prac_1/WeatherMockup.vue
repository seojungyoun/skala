<script setup>
import { ref, computed } from 'vue'

// 도시 검색어
const searchCity = ref('')

// 선택한 도시 상태 메시지
const selectedMessage = ref(
    '카드를 클릭하거나 검색해 보세요.'
)

// 날씨 Mock 데이터
// 개인 데이터로 제주 추가
const weatherList = ref([
    {
        id: 'city_01',
        name: '서울',
        temp: 28,
        status: '맑음',
    },
    {
        id: 'city_02',
        name: '수원',
        temp: 24,
        status: '비',
    },
    {
        id: 'city_03',
        name: '부산',
        temp: 26,
        status: '구름',
    },
    {
        id: 'city_04',
        name: '제주',
        temp: 22,
        status: '바람',
    },
])

// 검색어에 맞는 도시만 출력
const filteredWeatherList = computed(() => {
    const keyword = searchCity.value.trim()

    if (!keyword) {
        return weatherList.value
    }

    return weatherList.value.filter((city) =>
        city.name.includes(keyword)
    )
})

// 카드 클릭 시 선택 상태 표시
const selectCity = (cityName) => {
    selectedMessage.value =
        `${cityName}이 선택되었습니다.`
}

// 상세보기
const showDetail = (cityName, status) => {
    window.alert(
        `${cityName}의 현재 날씨는 [${status}] 상태입니다.`
    )
}
</script>

<template>
  <div class="weather-container">
    <h2>🌤️ 과제 1: 날씨 (Mockup)</h2>

    <!-- 도시 검색 영역 -->
    <div class="dashboard-card">
      <h3>
        🔍 도시 검색 (한글 즉시 동기화)
      </h3>

      <input
        type="text"
        :value="searchCity"
        placeholder="검색할 도시 이름 입력"
        @input="searchCity = $event.target.value"
      >

      <p class="search-text">
        검색 중인 도시:
        <strong>{{ searchCity }}</strong>
      </p>
    </div>

    <!-- 지역별 날씨 현황 -->
    <div class="dashboard-card">
      <h3>
        🌐 지역별 날씨 현황
      </h3>

      <!-- 배열을 v-for로 반복 출력 -->
      <div
        v-for="city in filteredWeatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <div class="weather-info">
          <h3>
            {{ city.name }}
            ({{ city.status }})
          </h3>

          <p>
            현재 기온:
            <strong>
              {{ city.temp }}°C
            </strong>
          </p>

          <!-- 25도 기준 조건부 렌더링 -->
          <span
            v-if="city.temp >= 25"
            class="temperature-label hot"
          >
            🔥 더움
          </span>

          <span
            v-else
            class="temperature-label cool"
          >
            ❄️ 선선함
          </span>
        </div>

        <!-- .stop으로 카드 클릭 이벤트 방지 -->
        <button
          type="button"
          @click.stop="
            showDetail(
              city.name,
              city.status
            )
          "
        >
          상세보기
        </button>
      </div>

      <!-- 검색 결과가 없을 경우 -->
      <p
        v-if="filteredWeatherList.length === 0"
        class="empty-message"
      >
        검색 결과가 없습니다.
      </p>
    </div>

    <!-- 카드 선택 상태 -->
    <div class="status-message">
      {{ selectedMessage }}
    </div>
  </div>
</template>

<style scoped>
.weather-container {
    width: 90%;
    max-width: 900px;
    margin: 30px auto;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Malgun Gothic",
        "맑은 고딕",
        Arial,
        sans-serif;
    color: #334155;
}

.weather-container > h2 {
    margin: 0 0 20px;
    font-size: 22px;
}

.dashboard-card {
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: #f8fafc;
}

.dashboard-card > h3 {
    margin: 0 0 12px;
    font-size: 15px;
}

.dashboard-card input {
    width: 100%;
    padding: 9px 10px;
    box-sizing: border-box;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background-color: #ffffff;
    font-size: 14px;
}

.search-text {
    margin: 8px 0 0;
    color: #64748b;
    font-size: 13px;
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

.weather-card:hover {
    background-color: #f1f5f9;
}

.weather-info h3 {
    margin: 0 0 6px;
    font-size: 15px;
}

.weather-info p {
    margin: 4px 0 7px;
    color: #64748b;
    font-size: 13px;
}

.temperature-label {
    display: inline-block;
    padding: 3px 7px;
    border-radius: 3px;
    color: #ffffff;
    font-size: 11px;
    font-weight: bold;
}

.hot {
    background-color: #ef4444;
}

.cool {
    background-color: #3b82f6;
}

.weather-card button {
    padding: 7px 11px;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background-color: #ffffff;
    color: #334155;
    cursor: pointer;
}

.weather-card button:hover {
    background-color: #f1f5f9;
}

.status-message {
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

.empty-message {
    margin: 10px 0 0;
    padding: 15px;
    color: #64748b;
    font-size: 13px;
    text-align: center;
}
</style>