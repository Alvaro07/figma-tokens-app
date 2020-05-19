<template>
  <div class="relative">
    <select
      class="appearance-none w-full bg-white border border-gray-300 rounded-lg py-6 pl-6 pr-12 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-b-4"
      @change="handleChange"
      :value="value">
      <option v-for="(option, i) in options" :key="option + i" :value="i">{{option}}</option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
    >
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number]
    }
  },
  data () {
    return {
      selected: null,
      mutableFlightSegment: JSON.parse(JSON.stringify(this.value))
    }
  },
  methods: {
    handleChange (evt) {
      this.$emit('input', evt.target.value)
      this.$emit('change')
    }
  }
}
</script>

<style>
</style>
