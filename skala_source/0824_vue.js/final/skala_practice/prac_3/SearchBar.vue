<script setup>
defineProps({
    query: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update-query'])

const handleInput = (event) => {
    emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label>
      🔍 도시 검색 (한글 즉시 동기화)
    </label>

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
.search-bar label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: bold;
}

.search-bar input {
    width: 100%;
    box-sizing: border-box;
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 12px;
}

.search-bar p {
    margin: 6px 0 0;
    color: #64748b;
    font-size: 11px;
}
</style>