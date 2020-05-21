<template>
  <div class="text-center py-12 text-green-400">
    <font-awesome-icon icon="spinner" spin size="4x"  />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean
    }
  }
}
</script>

<style>
</style>
