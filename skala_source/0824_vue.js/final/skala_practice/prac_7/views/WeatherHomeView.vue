<script setup>
import { ref, onMounted } from 'vue'

import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Divider from 'primevue/divider'

import {
    getCurrentWeather,
    getForecast,
    getAirQuality,
} from '../services/weatherApi.js'

const weatherData = ref(null)
const forecastList = ref([])
const airQuality = ref(null)

const isLoading = ref(false)
const errorMessage = ref('')

const loadAllData = async () => {
    try {
        isLoading.value = true
        errorMessage.value = ''

        const weather = await getCurrentWeather()
        weatherData.value = weather

        const forecast = await getForecast()

        forecastList.value = forecast.list
            .filter((item) =>
                item.dt_txt.includes('12:00:00')
            )
            .slice(0, 5)

        const air = await getAirQuality()
        airQuality.value = air.current
    } catch (error) {
        console.error('API 호출 실패:', error)

        errorMessage.value =
            '날씨 데이터를 불러오지 못했습니다.'
    } finally {
        isLoading.value = false
    }
}

// PM2.5 상태
const getPm25Severity = (value) => {
    if (value <= 15) return 'success'
    if (value <= 35) return 'warn'
    return 'danger'
}

// PM10 상태
const getPm10Severity = (value) => {
    if (value <= 30) return 'success'
    if (value <= 80) return 'warn'
    return 'danger'
}

const getAirLabel = (value, type) => {
    if (type === 'pm25') {
        if (value <= 15) return '좋음'
        if (value <= 35) return '보통'
        return '나쁨'
    }

    if (value <= 30) return '좋음'
    if (value <= 80) return '보통'
    return '나쁨'
}

onMounted(() => {
    loadAllData()
})
</script>

<template>
  <main class="weather-dashboard">
    <!-- 에러 -->
    <Message
      v-if="errorMessage"
      severity="error"
      :closable="false"
    >
      {{ errorMessage }}
    </Message>

    <!-- 로딩 -->
    <div
      v-if="isLoading && !weatherData"
      class="loading-area"
    >
      <ProgressSpinner />
      <p>날씨 데이터를 불러오는 중입니다.</p>
    </div>

    <template v-else>
      <!-- 상단 Hero 카드 -->
      <Card class="hero-card">
        <template #content>
          <div
            v-if="weatherData"
            class="hero-content"
          >
            <div class="hero-left">
              <Tag
                value="LIVE WEATHER"
                severity="info"
              />

              <h1>
                판교의 현재 날씨
              </h1>

              <p class="api-location">
                📍 OpenWeatherMap 위치:
                {{ weatherData.name }}
              </p>

              <div class="weather-condition">
                {{
                  weatherData.weather?.[0]
                    ?.description
                    ?? '정보 없음'
                }}
              </div>
            </div>

            <div class="hero-right">
              <div class="main-temperature">
                {{
                  Math.round(
                    weatherData.main?.temp
                      ?? 0
                  )
                }}°
              </div>

              <span class="unit">
                Celsius
              </span>

              <Button
                label="날씨 새로고침"
                icon="pi pi-refresh"
                :loading="isLoading"
                @click="loadAllData"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- 현재 날씨 상세 -->
      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">
              CURRENT CONDITIONS
            </span>

            <h2>
              현재 기상 정보
            </h2>
          </div>
        </div>

        <div
          v-if="weatherData"
          class="metric-grid"
        >
          <Card class="metric-card">
            <template #content>
              <div class="metric-icon">
                🌡️
              </div>

              <span class="metric-label">
                체감 온도
              </span>

              <strong class="metric-value">
                {{
                  Math.round(
                    weatherData.main
                      ?.feels_like
                      ?? 0
                  )
                }}℃
              </strong>
            </template>
          </Card>

          <Card class="metric-card">
            <template #content>
              <div class="metric-icon">
                💧
              </div>

              <span class="metric-label">
                습도
              </span>

              <strong class="metric-value">
                {{
                  weatherData.main
                    ?.humidity
                    ?? '-'
                }}%
              </strong>
            </template>
          </Card>

          <Card class="metric-card">
            <template #content>
              <div class="metric-icon">
                💨
              </div>

              <span class="metric-label">
                풍속
              </span>

              <strong class="metric-value">
                {{
                  weatherData.wind
                    ?.speed
                    ?? '-'
                }}
                m/s
              </strong>
            </template>
          </Card>

          <Card class="metric-card">
            <template #content>
              <div class="metric-icon">
                ☁️
              </div>

              <span class="metric-label">
                구름량
              </span>

              <strong class="metric-value">
                {{
                  weatherData.clouds
                    ?.all
                    ?? '-'
                }}%
              </strong>
            </template>
          </Card>
        </div>
      </section>

      <Divider />

      <!-- 5일 예보 -->
      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">
              FORECAST
            </span>

            <h2>
              5일 날씨 예보
            </h2>
          </div>

          <Tag
            value="OpenWeatherMap"
            severity="secondary"
          />
        </div>

        <div class="forecast-grid">
          <Card
            v-for="forecast in forecastList"
            :key="forecast.dt"
            class="forecast-card"
          >
            <template #content>
              <span class="forecast-date">
                {{
                  forecast.dt_txt
                    .slice(5, 10)
                }}
              </span>

              <div class="forecast-temp">
                {{
                  Math.round(
                    forecast.main.temp
                  )
                }}℃
              </div>

              <Tag
                :value="
                  forecast.weather?.[0]
                    ?.description
                    ?? '-'
                "
                severity="info"
              />
            </template>
          </Card>
        </div>
      </section>

      <Divider />

      <!-- 대기질 -->
      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">
              AIR QUALITY
            </span>

            <h2>
              판교 대기질
            </h2>
          </div>

          <Tag
            value="Open-Meteo"
            severity="success"
          />
        </div>

        <div
          v-if="airQuality"
          class="air-grid"
        >
          <Card class="air-card">
            <template #content>
              <div class="air-top">
                <div>
                  <span class="air-label">
                    PM2.5
                  </span>

                  <h3>
                    초미세먼지
                  </h3>
                </div>

                <Tag
                  :value="
                    getAirLabel(
                      airQuality.pm2_5,
                      'pm25'
                    )
                  "
                  :severity="
                    getPm25Severity(
                      airQuality.pm2_5
                    )
                  "
                />
              </div>

              <strong class="air-value">
                {{
                  airQuality.pm2_5
                    ?? '-'
                }}
                <small>㎍/㎥</small>
              </strong>
            </template>
          </Card>

          <Card class="air-card">
            <template #content>
              <div class="air-top">
                <div>
                  <span class="air-label">
                    PM10
                  </span>

                  <h3>
                    미세먼지
                  </h3>
                </div>

                <Tag
                  :value="
                    getAirLabel(
                      airQuality.pm10,
                      'pm10'
                    )
                  "
                  :severity="
                    getPm10Severity(
                      airQuality.pm10
                    )
                  "
                />
              </div>

              <strong class="air-value">
                {{
                  airQuality.pm10
                    ?? '-'
                }}
                <small>㎍/㎥</small>
              </strong>
            </template>
          </Card>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.weather-dashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

/* 로딩 */
.loading-area {
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 16px;

    color: #64748b;
}

/* Hero */
.hero-card {
    overflow: hidden;
}

.hero-content {
    min-height: 230px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 30px;

    padding: 14px;
}

.hero-left h1 {
    margin: 14px 0 5px;

    font-size: 34px;
    letter-spacing: -1px;
}

.api-location {
    margin: 0;

    color: #94a3b8;
    font-size: 13px;
}

.weather-condition {
    margin-top: 22px;

    color: #475569;
    font-size: 20px;
    font-weight: 600;
}

.hero-right {
    min-width: 180px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.main-temperature {
    line-height: 1;

    color: #2563eb;

    font-size: 76px;
    font-weight: 700;
}

.unit {
    margin: 7px 0 24px;

    color: #94a3b8;
    font-size: 12px;
}

/* Section */
.section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    margin-bottom: 14px;
}

.section-heading h2 {
    margin: 3px 0 0;

    font-size: 21px;
}

.eyebrow {
    color: #2563eb;

    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

/* 현재 기상 */
.metric-grid {
    display: grid;
    grid-template-columns:
        repeat(4, 1fr);

    gap: 10px;
}

.metric-card {
    text-align: center;
}

.metric-icon {
    margin-bottom: 8px;

    font-size: 25px;
}

.metric-label {
    display: block;

    margin-bottom: 7px;

    color: #64748b;
    font-size: 12px;
}

.metric-value {
    color: #334155;

    font-size: 20px;
}

/* 예보 */
.forecast-grid {
    display: grid;
    grid-template-columns:
        repeat(5, 1fr);

    gap: 10px;
}

.forecast-card {
    text-align: center;
}

.forecast-date {
    display: block;

    color: #64748b;
    font-size: 12px;
    font-weight: 600;
}

.forecast-temp {
    margin: 12px 0;

    color: #2563eb;

    font-size: 25px;
    font-weight: 700;
}

/* 대기질 */
.air-grid {
    display: grid;
    grid-template-columns:
        repeat(2, 1fr);

    gap: 12px;
}

.air-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.air-top h3 {
    margin: 3px 0 0;

    font-size: 16px;
}

.air-label {
    color: #94a3b8;

    font-size: 11px;
    font-weight: 700;
}

.air-value {
    display: block;

    margin-top: 24px;

    color: #334155;

    font-size: 31px;
}

.air-value small {
    color: #94a3b8;

    font-size: 12px;
    font-weight: normal;
}

/* 모바일 */
@media (max-width: 700px) {
    .hero-content {
        align-items: flex-start;
        flex-direction: column;
    }

    .hero-right {
        align-items: flex-start;
    }

    .metric-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .forecast-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .air-grid {
        grid-template-columns: 1fr;
    }
}
</style>