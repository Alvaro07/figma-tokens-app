<template>
  <div class="bg-white p-6 border-b-4 border-gray-400 border rounded-lg relative">
    <vue-json-pretty :showLine="false" :showDoubleQuotes="false" :deep="1" :data="data"></vue-json-pretty>
    <font-awesome-icon @click="$emit('onClose')" icon="times-circle" size="2x" class="close-icon text-red-600 absolute ml-4 hover:text-red-800 cursor-pointer transition-all ease-out duration-300"/>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'TokensTree',
  components: {
    VueJsonPretty
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.close-icon {
  top: -7px;
  right: -7px
}
</style>
