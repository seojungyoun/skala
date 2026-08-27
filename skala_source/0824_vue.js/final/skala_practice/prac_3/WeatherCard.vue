<script setup>
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

const selectCard = () => {
    emit('select-card', props.city)
}

const clickDetail = () => {
    emit('click-detail', props.city)
}
</script>

<template>
  <div
    class="weather-card"
    @click="selectCard"
  >
    <div class="weather-info">
      <p class="city-name">
        {{ city.name }} ({{ city.status }})
      </p>

      <p class="temperature">
        현재 기온: {{ city.temp }}°C
      </p>

      <span
        v-if="city.temp >= 25"
        class="tag hot"
      >
        🔥 더움
      </span>

      <span
        v-else
        class="tag cool"
      >
        ❄️ 선선함
      </span>
    </div>

    <button
      type="button"
      class="detail-button"
      @click.stop="clickDetail"
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
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: #ffffff;
    cursor: pointer;
}

.weather-card:hover {
    background-color: #f1f5f9;
}

.city-name {
    margin: 0 0 3px;
    font-size: 12px;
    font-weight: bold;
}

.temperature {
    margin: 0 0 5px;
    color: #64748b;
    font-size: 11px;
}

.tag {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 2px;
    color: #ffffff;
    font-size: 10px;
    font-weight: bold;
}

.hot {
    background-color: #ef4444;
}

.cool {
    background-color: #3b82f6;
}

.detail-button {
    padding: 4px 9px;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    background-color: #f8fafc;
    color: #334155;
    font-size: 11px;
    cursor: pointer;
}
</style>