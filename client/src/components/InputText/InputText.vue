<template>
  <input
    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4"
    :class="extraClass"
    type="text"
    :placeholder="placeholder || 'Type'"
    :value="value"
    @input="getData($event.target.value)"
    ref="field"
    @keyup="e => onInputKeyUp(e)"
  />
</template>

<script>
export default {
  name: 'InputText',
  props: {
    placeholder: {
      type: String
    },
    extraClass: {
      type: String
    },
    value: {
      type: String
    }
  },
  computed: {
    extraClasses () {
      return this.extraClass || ''
    }
  },
  methods: {
    getData (data) {
      this.$emit('input', data)
    },
    onInputKeyUp (e) {
      if (this.onKeyUp !== null) this.$emit('onKeyUp', e.target.value)
    }
  }
}
</script>

<style>
</style>
