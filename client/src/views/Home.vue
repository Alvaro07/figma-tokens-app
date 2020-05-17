<template>
  <section class="flex items-center justify-center bg-gray-100">
    <div>
      <h1 class="p-12 shadow-font text-7xl tracking-tight">Get your Figma tokens</h1>

      <form class="flex">
        <input class="mr-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4" type="text" placeholder="Auth user token">
        <input class="flex-one mr-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4" type="text" placeholder="Id File">
        <button @click="e => getEvents(e)" class="bg-blue-500 hover:bg-blue-400 text-white font-bold my-1 py-3 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Get tokens
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  name: 'Home',
  methods: {
    getEvents (e) {
      e.preventDefault()

      EventService.getEvents().then(data => {
        console.log(data)
      })
    }
  }
}
</script>
