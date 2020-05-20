<template>
  <button
    @click="handleClick"
    class="transition duration-300 ease-in-out text-white font-bold my-1 py-4 border-b-4 rounded"
    :class="[disabled && disabledClasses, extraClass, typeClasses, sizeClass]"
    :disabled="disabled"
  ><slot></slot></button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: ['extraClass', 'disabled', 'type', 'size'],
  methods: {
    handleClick (evt) {
      evt.preventDefault()
      this.$emit('click', evt)
    }
  },
  computed: {
    extraClasses () {
      return this.extraClass || ''
    },
    disabledClasses () {
      return 'opacity-50 pointer-events-none'
    },
    typeClasses () {
      return this.type === 'green'
        ? 'bg-green-500 border-green-700 hover:border-green-500 hover:border-green-400'
        : 'bg-blue-500 border-blue-700 hover:border-blue-500 hover:bg-blue-400 '
    },
    sizeClass () {
      return this.size === 'small' ? 'px-8' : 'px-24'
    }
  }
}
</script>

<style>
</style>
