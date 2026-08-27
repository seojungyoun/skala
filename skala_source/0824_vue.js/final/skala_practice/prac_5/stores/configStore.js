import { defineStore } from 'pinia'

// 날씨 설정 Store
export const useConfigStore = defineStore('config', {
    state: () => ({
        // 온도 단위
        unit: 'celsius',

        // 선택된 도시
        selectedCity: '',
    }),

    getters: {
        // 현재 단위 기호
        unitSymbol: (state) => {
            return state.unit === 'celsius'
                ? '℃'
                : '℉'
        },

        // 선택된 도시 메시지
        selectedCityMessage: (state) => {
            if (!state.selectedCity) {
                return '카드를 클릭하거나 검색해 보세요.'
            }

            return `${state.selectedCity}이 선택되었습니다.`
        },
    },

    actions: {
        // 섭씨 - 화씨 전환
        toggleUnit() {
            this.unit =
                this.unit === 'celsius'
                    ? 'fahrenheit'
                    : 'celsius'
        },

        // 도시 선택
        selectCity(name) {
            this.selectedCity = name
        },
    },
})