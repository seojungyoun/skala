<script setup>
// 부모에게서 도시 데이터 전달받기
defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits([
    'select-card',
    'click-detail',
])
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
        <strong>{{ city.temp }}°C</strong>
      </p>

      <!-- 기온에 따른 조건 표시 -->
      <span v-if="city.temp >= 25">
        🔥 더움
      </span>

      <span v-else>
        ❄️ 선선함
      </span>
    </div>

    <!-- 부모에게 상세보기 이벤트 전달 -->
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
    margin: 4px 0;
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