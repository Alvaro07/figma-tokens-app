<template>
  <section class="flex items-center justify-center w-full">
    <div class="w-full max-w-screen-md">
      <h1 class="p-12 shadow-font text-7xl tracking-tight text-center">Get your Figma tokens</h1>

      <form class="flex justify-center mb-10">
        <input
          v-model="authToken"
          class="flex-1 mr-4 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4"
          type="text"
          placeholder="Auth user token"
        />
        <input
          v-model="idFile"
          class="flex-1 mr-4 max-w-sm bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-4 px-6 block appearance-none leading-normal border-b-4"
          type="text"
          placeholder="Id File"
        />
        <button
          @click="e => getEvents(e)"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold my-1 py-3 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >Get tokens</button>
      </form>
      <p v-if="loading">Loading...</p>

      <div v-if="errorMessage">
        <p
          class="text-red-700 py-3 px-32 text-center bg-red-200 border-red-700 border rounded-lg"
        >{{ errorMessage }}</p>
      </div>

      <div v-if="tokensData" class="bg-white p-6 border-b-4 border-gray-400 border rounded-lg">
        <vue-json-pretty :showLine="false" :showDoubleQuotes="false" :deep="1" :data="tokensData"></vue-json-pretty>
      </div>
    </div>
  </section>
</template>

<script>
import EventTokens from '@/services/EventTokens.js'
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'Home',
  components: {
    VueJsonPretty
  },
  data () {
    return {
      authToken: '',
      idFile: '',
      errorMessage: null,
      tokensData: null,
      loading: false
    }
  },
  methods: {
    getEvents (e) {
      e.preventDefault()
      this.loading = true
      this.errorMessage = null
      const formData = {
        authToken: this.authToken,
        idFile: this.idFile
      }

      EventTokens.getTokens(formData).then(data => {
        if (data.type === 'error') {
          this.errorMessage = data.message
        } else {
          this.errorMessage = null
          this.tokensData = data
        }

        this.loading = false
      })
    }
  }
}
</script>
