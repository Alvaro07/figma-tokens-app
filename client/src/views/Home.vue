<template>
  <section class="flex items-center justify-center w-full">
    <div class="w-full max-w-screen-md">
      <h1 class="p-12 shadow-font text-7xl tracking-tight text-center">Get your Figma tokens</h1>

      <TokenForm
        :tokens="tokensSearch"
        :disabled="tokensData ? true : false"
        @onAddToken="addToken"
        @onSearch="getData"
        ref="form"
      />

      <div v-if="errorMessage">
        <p
          class="text-red-700 py-3 px-32 text-center bg-red-200 border-red-700 border rounded-lg"
        >{{ errorMessage }}</p>
      </div>

      <ul v-if="tokensSearch" class="flex items-center justify-center flex-wrap">
        <li
          class="relative bg-gray-600 text-white rounded-lg px-4 py-1 ml-4 mb-4 first:ml-0 flex items-center"
          v-for="(token, i) in tokensSearch"
          :key="token.name + i"
        >
          {{ `token: ${token.name} (${token.type})`}}
          <font-awesome-icon
            @click="deleteToken(token.name)"
            icon="times-circle"
            class="ml-4 hover:text-red-400 cursor-pointer transition-all ease-out duration-300"
          />
        </li>
      </ul>

      <Loading v-if="loading" />
      <TokensTree v-if="tokensData" :data="tokensData" @onClose="tokensData = null" />
    </div>
  </section>
</template>

<script>
import EventTokens from '@/services/EventTokens.js'
import TokenForm from '@/components/TokenForm/TokenForm'
import TokensTree from '@/components/TokensTree/TokensTree'
import Loading from '@/components/Loading/Loading'

export default {
  name: 'Home',
  components: {
    TokenForm,
    TokensTree,
    Loading
  },
  data () {
    return {
      errorMessage: null,
      tokensData: null,
      loading: false,
      tokensSearch: []
    }
  },
  methods: {
    getData (data) {
      this.loading = true
      this.errorMessage = null

      const formData = {
        authToken: data.authToken,
        idFile: data.idFile,
        config: this.tokensSearch
      }

      EventTokens.getTokens(formData).then(data => {
        if (data.type === 'error') {
          this.errorMessage = data.message
        } else {
          this.errorMessage = null
          this.tokensData = data
          this.$refs.form.$refs.authInput.clear()
          this.$refs.form.$refs.idFileInput.clear()
        }

        this.loading = false
        this.tokensSearch = []
      })
    },
    addToken (token) {
      this.tokensSearch.push(token)
      this.errorMessage = null
    },
    deleteToken (token) {
      this.tokensSearch = this.tokensSearch.filter(e => e.name !== token)
    }
  }
}
</script>
