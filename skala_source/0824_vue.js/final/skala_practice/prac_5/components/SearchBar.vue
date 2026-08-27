<script setup>
// 부모에게서 검색어를 전달받음
defineProps({
    query: {
        type: String,
        default: '',
    },
})

// 검색어 변경 이벤트 정의
const emit = defineEmits([
    'update-query',
])

// 입력값을 부모에게 전달
const handleInput = (event) => {
    emit(
        'update-query',
        event.target.value,
    )
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
    margin: 0 0 8px;
    font-size: 13px;
}

.search-bar input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    background-color: #ffffff;
}

.search-bar p {
    margin: 8px 0 0;
    color: #64748b;
    font-size: 12px;
}
</style>