<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const city = ref(null)

// 상세 페이지용 Mock 데이터
const weatherList = [
    {
        id: 'city_01',
        name: '서울',
        temp: 28,
        status: '맑음',
        humidity: 55,
        wind: 2.5,
    },
    {
        id: 'city_02',
        name: '수원',
        temp: 24,
        status: '비',
        humidity: 70,
        wind: 3.2,
    },
    {
        id: 'city_03',
        name: '부산',
        temp: 26,
        status: '구름',
        humidity: 65,
        wind: 4.1,
    },
]

// URL의 cityId로 도시 찾기
onMounted(() => {
    city.value = weatherList.find(
        (item) => item.id === route.params.cityId
    )
})

// 메인으로 이동
const goHome = () => {
    router.push('/prac4')
}
</script>

<template>
  <main class="detail-wrapper">
    <section
      v-if="city"
      class="detail-card"
    >
      <h3>
        📍 지역별 상세 기상 정보
      </h3>

      <div class="detail-content">
        <p>
          <strong>지역:</strong>
          {{ city.name }}
        </p>

        <p>
          <strong>날씨:</strong>
          {{ city.status }}
        </p>

        <p>
          <strong>현재 기온:</strong>
          {{ city.temp }}°C
        </p>

        <p>
          <strong>습도:</strong>
          {{ city.humidity }}%
        </p>

        <p>
          <strong>풍속:</strong>
          {{ city.wind }}m/s
        </p>
      </div>

      <button
        class="back-button"
        @click="goHome"
      >
        메인 대시보드로 돌아가기
      </button>
    </section>

    <section
      v-else
      class="detail-card"
    >
      <h3>
        도시 정보를 찾을 수 없습니다.
      </h3>

      <button
        type="button"
        @click="goHome"
      >
        ← 메인 대시보드로 돌아가기
      </button>
    </section>
  </main>
</template>

<style scoped>
.detail-wrapper {
    width: 100%;
    margin: 0;
    color: #334155;
}

.detail-card {
    padding: 18px;
    border: 1px solid #e2e8f0;
    border-radius: 7px;
    background-color: #f8fafc;
}

.detail-card h3 {
    margin: 0 0 14px;
    font-size: 15px;
}

.detail-content {
    padding: 14px;
    border-radius: 5px;
    background-color: #ffffff;
}

.detail-content p {
    margin: 6px 0;
    color: #475569;
    font-size: 13px;
}

.detail-card button {
    margin-top: 14px;
    padding: 7px 12px;
    border: 1px solid #334155;
    border-radius: 4px;
    background-color: #334155;
    color: #ffffff;
    font-size: 12px;
    cursor: pointer;
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