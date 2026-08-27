<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import StatusMessage from '../components/StatusMessage.vue'
import UnitToggler from '../components/UnitToggler.vue'

import { useConfigStore } from '../stores/configStore.js'

const router = useRouter()
const configStore = useConfigStore()

// 검색어
const searchQuery = ref('')

// 날씨 Mock 데이터
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
])

// 검색 결과
const filteredWeatherList = computed(() => {
    const keyword = searchQuery.value.trim()

    if (!keyword) {
        return weatherList.value
    }

    return weatherList.value.filter((city) =>
        city.name.includes(keyword)
    )
})

// 검색어 변경
const handleUpdateQuery = (query) => {
    searchQuery.value = query
}

// 카드 선택
const handleSelectCard = (city) => {
    configStore.selectCity(city.name)
}

// 상세보기
const handleClickDetail = (city) => {
    router.push(`/prac5/weather/${city.id}`)
}
</script>

<template>
  <main class="weather-wrapper">
    <!-- 단위 변경 -->
    <div class="unit-area">
      <UnitToggler />
    </div>

    <!-- 도시 검색 -->
    <BaseDashboardCard>
      <SearchBar
        :query="searchQuery"
        @update-query="handleUpdateQuery"
      />
    </BaseDashboardCard>

    <!-- 날씨 목록 -->
    <BaseDashboardCard>
      <h3>
        🌐 지역별 날씨 현황
      </h3>

      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="handleSelectCard"
        @click-detail="handleClickDetail"
      />
    </BaseDashboardCard>

    <!-- 선택 상태 메시지 -->
    <StatusMessage
      :message="configStore.selectedCityMessage"
    />
  </main>
</template>

<style scoped>
.weather-wrapper {
    width: 100%;
    margin: 0;
    color: #334155;
}

.unit-area {
    display: flex;
    justify-content: flex-end;

    margin-bottom: 10px;
}
</style>