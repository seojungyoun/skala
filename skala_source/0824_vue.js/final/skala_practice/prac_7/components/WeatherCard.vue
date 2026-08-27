<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits([
    'select-card',
    'click-detail',
])

const configStore = useConfigStore()

// 단위에 맞는 온도 계산
const displayTemp = computed(() => {
    const rawTemp = props.city.temp

    if (configStore.unit === 'fahrenheit') {
        return Math.round(
            (rawTemp * 9) / 5 + 32
        )
    }

    return rawTemp
})
</script>

<template>
  <div
    class="weather-card"
    @click="emit('select-card', city)"
  >
    <div>
      <h3>
        {{ city.name }} ({{ city.status }})
      </h3>

      <p>
        현재 기온:
        {{ displayTemp }}{{ configStore.unitSymbol }}
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
      @click.stop="emit('click-detail', city)"
    >
      상세보기
    </button>
  </div>
</template>

<style scoped>
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

.weather-card h3 {
    margin: 0 0 6px;
    font-size: 15px;
}

.weather-card p {
    margin: 5px 0;
    color: #64748b;
    font-size: 13px;
}

.weather-card button {
    padding: 7px 11px;

    border: 1px solid #cbd5e1;
    border-radius: 5px;

    background-color: #ffffff;
    cursor: pointer;
}
</style>