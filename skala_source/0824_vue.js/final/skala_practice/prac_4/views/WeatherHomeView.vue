<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import StatusMessage from '../components/StatusMessage.vue'

const router = useRouter()

// 검색어
const searchQuery = ref('')

// 선택된 도시 안내
const selectedCityInfo = ref(
    '카드를 클릭하거나 검색해 보세요.'
)

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
    selectedCityInfo.value =
        `${city.name}이 선택되었습니다.`
}

// 상세 페이지 이동
const handleClickDetail = (city) => {
    router.push(`/prac4/weather/${city.id}`)
}
</script>

<template>
  <main class="weather-wrapper">
    <BaseDashboardCard>
      <SearchBar
        :query="searchQuery"
        @update-query="handleUpdateQuery"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🌐 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select-card="handleSelectCard"
        @click-detail="handleClickDetail"
      />
    </BaseDashboardCard>

    <StatusMessage
      :message="selectedCityInfo"
    />
  </main>
</template>

<style scoped>
.weather-wrapper {
    width: 90%;
    max-width: 800px;
    margin: 30px auto;
    color: #334155;
}
</style>