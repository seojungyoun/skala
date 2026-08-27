import axios from 'axios'

const API_KEY =
    import.meta.env.VITE_OPENWEATHER_API_KEY

// 판교 좌표
const LAT = 37.4058453
const LON = 127.0998294

// 1. OpenWeatherMap 현재 날씨
export const getCurrentWeather = async () => {
    const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
            params: {
                lat: LAT,
                lon: LON,
                appid: API_KEY,
                units: 'metric',
                lang: 'kr',
            },
            timeout: 10000,
        }
    )

    return response.data
}

// 2. OpenWeatherMap 5일 예보
export const getForecast = async () => {
    const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
            params: {
                lat: LAT,
                lon: LON,
                appid: API_KEY,
                units: 'metric',
                lang: 'kr',
            },
            timeout: 10000,
        }
    )

    return response.data
}

// 3. 기타 외부 API: Open-Meteo 대기질
export const getAirQuality = async () => {
    const response = await axios.get(
        'https://air-quality-api.open-meteo.com/v1/air-quality',
        {
            params: {
                latitude: LAT,
                longitude: LON,
                current: 'pm10,pm2_5',
                timezone: 'Asia/Seoul',
            },
            timeout: 10000,
        }
    )

    return response.data
}