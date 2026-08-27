<script setup>
import { useConfigStore } from '../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      날씨 단위:
      {{ configStore.unit === 'celsius'
        ? '섭씨(℃)'
        : '화씨(℉)' }}
    </span>

    <button
      type="button"
      @click="configStore.toggleUnit()"
    >
      단위변경
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
    display: flex;
    align-items: center;
    gap: 8px;
}

.unit-toggler span {
    font-size: 12px;
    color: #64748b;
}

.unit-toggler button {
    padding: 5px 9px;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background: white;
    cursor: pointer;
}
</style>