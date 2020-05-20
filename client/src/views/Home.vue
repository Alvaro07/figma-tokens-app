<template>
  <section class="flex items-center justify-center w-full">
    <div class="w-full max-w-screen-md">
      <h1 class="p-12 shadow-font text-7xl tracking-tight text-center">Get your Figma tokens</h1>

      <form class="mb-10">
        <div class="flex justify-center mb-8">
          <input-text v-model="authToken" extra-class="flex-1 mr-4" placeholder="Auth token" />
          <input-text v-model="idFile" extra-class="flex-1 mr-4" placeholder="Id File" />
        </div>

        <div class="flex justify-center mb-4">
          <input-text v-model="tokenName" extra-class="mr-4 " placeholder="Token name" ref="addInput" />
          <custom-select :options="typeOptions" v-model="tokenType" class="addSelect" />

          <div class="ml-4 flex items-center">
            <custom-button
              size="small"
              type="green"
              @click="addToken"
              :disabled="isDisabledAdd"
            >Add</custom-button>
          </div>

          <div class="ml-8 pl-8 flex items-center border-l">
            <custom-button @click="getEvents" :disabled="isDisabledToken">Get tokens</custom-button>
          </div>
        </div>
      </form>

      <div v-if="errorMessage">
        <p
          class="text-red-700 py-3 px-32 text-center bg-red-200 border-red-700 border rounded-lg"
        >{{ errorMessage }}</p>
      </div>

      <ul v-if="tokensSearch" class="flex items-center justify-center">
        <li
          class="bg-gray-600 text-white rounded-lg px-4 py-1 ml-4 first:ml-0"
          v-for="(token, i) in tokensSearch"
          :key="token.name + i"
        >{{ `token: ${token.name} (${token.type})`}}</li>
      </ul>

      <p v-if="loading">Loading...</p>

      <div v-if="tokensData" class="bg-white p-6 border-b-4 border-gray-400 border rounded-lg">
        <vue-json-pretty :showLine="false" :showDoubleQuotes="false" :deep="1" :data="tokensData"></vue-json-pretty>
      </div>
    </div>
  </section>
</template>

<script>
import EventTokens from '@/services/EventTokens.js'
import VueJsonPretty from 'vue-json-pretty'
import Button from '@/components/Button/Button'
import Select from '@/components/Select/Select'
import InputText from '@/components/InputText/InputText'

export default {
  name: 'Home',
  components: {
    VueJsonPretty,
    CustomButton: Button,
    CustomSelect: Select,
    InputText
  },
  data () {
    return {
      authToken: '',
      idFile: '',
      tokenName: '',
      tokenType: 0,
      errorMessage: null,
      tokensSearch: [],
      tokensData: null,
      loading: false,
      typeOptions: [
        'color',
        'typography',
        'space',
        'radius',
        'breakpoint',
        'opacity'
      ]
    }
  },
  methods: {
    getEvents (e) {
      this.loading = true
      this.errorMessage = null

      const formData = {
        authToken: this.authToken,
        idFile: this.idFile,
        config: this.tokensSearch
      }

      EventTokens.getTokens(formData).then(data => {
        if (data.type === 'error') {
          this.errorMessage = data.message
        } else {
          this.errorMessage = null
          this.tokensData = data
        }

        this.loading = false
        this.tokensSearch = []
      })
    },
    addToken () {
      this.tokensSearch.push({ name: this.tokenName, type: this.typeOptions[this.tokenType] })
      this.tokenName = ''
      this.tokenType = 0
    }
  },
  computed: {
    isDisabledToken () {
      return !(this.tokensSearch.length && this.authToken && this.idFile)
    },
    isDisabledAdd () {
      return !this.tokenName
    }
  }
}
</script>
