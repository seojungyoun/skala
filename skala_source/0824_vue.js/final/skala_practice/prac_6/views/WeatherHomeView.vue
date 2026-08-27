<script setup>
import { ref, onMounted } from 'vue'

import {
    getCurrentWeather,
    getForecast,
    getAirQuality,
} from '../services/weatherApi.js'

// 현재 날씨
const weatherData = ref(null)

// 예보
const forecastList = ref([])

// 대기질
const airQuality = ref(null)

// 상태
const isLoading = ref(false)
const errorMessage = ref('')

// 모든 API 데이터 불러오기
const loadAllData = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        // 1. 현재 날씨
        const weather = await getCurrentWeather()
        weatherData.value = weather

        console.log(
            '현재 날씨:',
            weather
        )

        // 2. 5일 예보
        const forecast = await getForecast()

        console.log(
            '날씨 예보:',
            forecast
        )

        // 하루에 하나씩만 추출
        forecastList.value =
            forecast.list
                .filter((item) =>
                    item.dt_txt.includes('12:00:00')
                )
                .slice(0, 5)

        // 3. 외부 대기질 API
        const air = await getAirQuality()
        airQuality.value = air.current

        console.log(
            '대기질:',
            air
        )

    } catch (error) {
        console.error(
            'API 호출 실패:',
            error
        )

        if (error.response) {
            errorMessage.value =
                `API 오류가 발생했습니다. (${error.response.status})`
        } else if (
            error.code === 'ECONNABORTED'
        ) {
            errorMessage.value =
                'API 요청 시간이 초과되었습니다.'
        } else {
            errorMessage.value =
                '데이터를 불러오지 못했습니다.'
        }

    } finally {
        isLoading.value = false
    }
}

// 화면 진입 시 자동 실행
onMounted(() => {
    loadAllData()
})
</script>

<template>
  <main class="weather-wrapper">
    <!-- 로딩 -->
    <div
      v-if="isLoading"
      class="message-box"
    >
      날씨 정보를 불러오는 중입니다...
    </div>

    <!-- 오류 -->
    <div
      v-else-if="errorMessage"
      class="error-box"
    >
      {{ errorMessage }}
    </div>

    <template v-else>
      <!-- ===================== -->
      <!-- 1. 실시간 날씨 -->
      <!-- ===================== -->

      <section class="dashboard-card">
        <div class="card-header">
          <div>
            <h3>
              🌤️ 판교 실시간 날씨
            </h3>

            <p>
              OpenWeatherMap API 실시간 데이터
            </p>
          </div>

          <button
            type="button"
            @click="loadAllData"
          >
            새로고침
          </button>
        </div>

        <div
          v-if="weatherData"
          class="current-weather"
        >
          <div class="weather-title">
            <div>
              <h2>
                📍 판교
              </h2>

              <p class="api-location">
                API 위치:
                {{ weatherData.name }}
              </p>

              <p class="description">
                {{
                  weatherData
                    .weather?.[0]
                    ?.description
                    ?? '정보 없음'
                }}
              </p>
            </div>

            <div class="temperature">
              {{
                weatherData.main?.temp != null
                  ? Math.round(
                    weatherData.main.temp
                  )
                  : '-'
              }}℃
            </div>
          </div>

          <div class="info-grid">
            <div class="info-box">
              <span>
                🌡️ 체감 온도
              </span>

              <strong>
                {{
                  weatherData.main
                    ?.feels_like != null
                    ? Math.round(
                      weatherData
                        .main
                        .feels_like
                    )
                    : '-'
                }}℃
              </strong>
            </div>

            <div class="info-box">
              <span>
                💧 습도
              </span>

              <strong>
                {{
                  weatherData.main
                    ?.humidity
                    ?? '-'
                }}%
              </strong>
            </div>

            <div class="info-box">
              <span>
                💨 풍속
              </span>

              <strong>
                {{
                  weatherData.wind
                    ?.speed
                    ?? '-'
                }}
                m/s
              </strong>
            </div>

            <div class="info-box">
              <span>
                ☁️ 구름
              </span>

              <strong>
                {{
                  weatherData.clouds
                    ?.all
                    ?? '-'
                }}%
              </strong>
            </div>
          </div>
        </div>
      </section>


      <!-- ===================== -->
      <!-- 2. OpenWeatherMap 추가 API -->
      <!-- ===================== -->

      <section class="dashboard-card">
        <h3>
          📅 5일 날씨 예보
        </h3>

        <p class="section-description">
          OpenWeatherMap Forecast API
        </p>

        <div class="forecast-grid">
          <div
            v-for="forecast in forecastList"
            :key="forecast.dt"
            class="forecast-card"
          >
            <strong>
              {{
                forecast.dt_txt
                  .slice(5, 10)
              }}
            </strong>

            <span class="forecast-temp">
              {{
                Math.round(
                  forecast.main.temp
                )
              }}℃
            </span>

            <span>
              {{
                forecast.weather?.[0]
                  ?.description
                  ?? '-'
              }}
            </span>
          </div>
        </div>
      </section>


      <!-- ===================== -->
      <!-- 3. 기타 외부 API -->
      <!-- ===================== -->

      <section class="dashboard-card">
        <h3>
          🌿 판교 대기질
        </h3>

        <p class="section-description">
          Open-Meteo Air Quality API
        </p>

        <div
          v-if="airQuality"
          class="air-grid"
        >
          <div class="air-card">
            <span>
              초미세먼지 PM2.5
            </span>

            <strong>
              {{
                airQuality.pm2_5
                  ?? '-'
              }}
              ㎍/㎥
            </strong>
          </div>

          <div class="air-card">
            <span>
              미세먼지 PM10
            </span>

            <strong>
              {{
                airQuality.pm10
                  ?? '-'
              }}
              ㎍/㎥
            </strong>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.weather-wrapper {
    width: 100%;
    margin: 0;
    color: #334155;
}

.dashboard-card {
    margin-bottom: 16px;
    padding: 18px;

    border: 1px solid #e2e8f0;
    border-radius: 8px;

    background-color: #f8fafc;
}

.dashboard-card h3 {
    margin: 0 0 6px;
}

.section-description {
    margin: 0 0 16px;

    color: #64748b;
    font-size: 13px;
}

/* 현재 날씨 헤더 */
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;
}

.card-header p {
    margin: 4px 0 0;

    color: #64748b;
    font-size: 13px;
}

.card-header button {
    padding: 8px 14px;

    border: none;
    border-radius: 7px;

    background-color: #2563eb;
    color: white;

    font-weight: 600;
    cursor: pointer;
}

.card-header button:hover {
    background-color: #1d4ed8;
}

/* 현재 날씨 */
.current-weather {
    margin-top: 18px;
    padding: 20px;

    border: 1px solid #bfdbfe;
    border-radius: 8px;

    background-color: #ffffff;
}

.weather-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
}

.weather-title h2 {
    margin: 0 0 4px;
}

.api-location {
    margin: 0 0 3px;

    color: #94a3b8;
    font-size: 11px;
}

.description {
    margin: 0;
    color: #64748b;
}

.temperature {
    color: #2563eb;

    font-size: 32px;
    font-weight: bold;
}

.info-grid {
    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 10px;
}

.info-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px;

    border: 1px solid #e2e8f0;
    border-radius: 6px;

    background-color: #f8fafc;
}

.info-box span {
    color: #64748b;
}

/* 예보 */
.forecast-grid {
    display: grid;
    grid-template-columns:
        repeat(5, 1fr);

    gap: 8px;
}

.forecast-card {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 7px;

    padding: 13px 8px;

    border: 1px solid #e2e8f0;
    border-radius: 7px;

    background-color: #ffffff;

    font-size: 12px;
}

.forecast-temp {
    color: #2563eb;

    font-size: 18px;
    font-weight: bold;
}

/* 대기질 */
.air-grid {
    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 10px;
}

.air-card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 14px;

    border: 1px solid #bbf7d0;
    border-radius: 7px;

    background-color: #f0fdf4;
}

.air-card span {
    color: #64748b;
}

.air-card strong {
    color: #166534;
}

/* 상태 */
.message-box {
    padding: 16px;

    border-radius: 7px;

    background-color: #f8fafc;

    text-align: center;
    color: #64748b;
}

.error-box {
    padding: 16px;

    border: 1px solid #fecaca;
    border-radius: 7px;

    background-color: #fef2f2;

    color: #dc2626;
    text-align: center;
}

@media (max-width: 700px) {
    .forecast-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .info-grid,
    .air-grid {
        grid-template-columns: 1fr;
    }
}
</style>