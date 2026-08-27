<script setup>
import { ref, computed } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import StatusMessage from './StatusMessage.vue'

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const filteredWeatherList = computed(() => {
    const keyword = searchQuery.value.trim()

    if (!keyword) {
        return weatherList.value
    }

    return weatherList.value.filter((item) => {
        return item.name.includes(keyword)
    })
})

const handleUpdateQuery = (newQuery) => {
    searchQuery.value = newQuery
}

const handleSelectCard = (city) => {
    selectedCityInfo.value = `${city.name}이 선택되었습니다.`
}

const handleClickDetail = (city) => {
    window.alert(
        `${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`,
    )
}
</script>

<template>
  <div class="weather-parent">
    <h2>🌤️ 과제 3: 날씨 (컴포넌트)</h2>

    <BaseDashboardCard>
      <SearchBar
        :query="searchQuery"
        @update-query="handleUpdateQuery"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="weather-list">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />
      </div>
    </BaseDashboardCard>

    <StatusMessage :message="selectedCityInfo" />
  </div>
</template>

<style scoped>
.weather-parent {
    grid-column: 1 / -1;
    width: 95vw;
    max-width: 900px;
    margin: 20px auto;
    box-sizing: border-box;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Malgun Gothic",
        "맑은 고딕",
        Arial,
        sans-serif;
    color: #334155;
}

.weather-parent h2 {
    margin: 0 0 14px;
    font-size: 18px;
    font-weight: bold;
}

.weather-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* .status-bar {
    margin-top: 12px;
    padding: 10px;
    border: 1px solid #bbf7d0;
    border-radius: 4px;
    background-color: #dcfce7;
    color: #166534;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
} */
</style>