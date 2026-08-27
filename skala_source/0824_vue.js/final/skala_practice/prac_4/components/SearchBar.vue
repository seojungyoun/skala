<script setup>
// 부모에게 검색어 전달
defineProps({
    query: {
        type: String,
        default: '',
    },
})

const emit = defineEmits([
    'update-query',
])

const handleInput = (event) => {
    emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <h3>🔍 도시 검색</h3>

    <input
      type="text"
      :value="query"
      placeholder="검색할 도시 이름 입력"
      @input="handleInput"
    >

    <p>
      검색 중인 도시:
      <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar h3 {
    margin-top: 0;
}

.search-bar input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
}

.search-bar p {
    margin-bottom: 0;
    color: #64748b;
    font-size: 13px;
}
</style>