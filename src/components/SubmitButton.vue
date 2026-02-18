<script setup lang="ts">
interface IProps {
  text: string
}
const props = defineProps<IProps>()
</script>

<template>
  <button>{{ text }}</button>
</template>

<style scoped lang="scss">

</style>
