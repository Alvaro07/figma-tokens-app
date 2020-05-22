<template>
  <section class="flex w-full flex-col items-center">
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
      <TokensTree v-if="tokensData" :data="tokensData" @onClose="resetTokens" />
      <div v-if="tokensData && !tokenStyles.length" class="py-8 justify-center flex items-center">
        <custom-button
          @click="handleStyle"
        >Get styles</custom-button>
      </div>

    </div>
    <div class="w-full max-w-screen-lg px-8 mt-8">
      <div v-if="tokenStyles.length">
        <ul class="grid grid-code gap-8">
          <li
            class="bg-white p-8 border-b-4 border-gray-400 border rounded-lg h-full flex-col justify-center"
            v-for="(token, i) in tokenStyles"
            :key="`tokenStyle${i}`"
          >
            <p class="text-2xl mb-4">{{ token.name }}</p>
            <pre class="language-css rounded-lg"><code>{{token.code }}</code></pre>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import EventTokens from '@/services/EventTokens.js'
import TokenForm from '@/components/TokenForm/TokenForm'
import TokensTree from '@/components/TokensTree/TokensTree'
import Loading from '@/components/Loading/Loading'
import Button from '@/components/Button/Button'
import { codeTransform } from '../utils/utils'

export default {
  name: 'Home',
  components: {
    TokenForm,
    TokensTree,
    Loading,
    CustomButton: Button
  },
  data () {
    return {
      errorMessage: null,
      tokensData: null,
      loading: false,
      tokensSearch: [],
      tokenStyles: []
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
          console.log(data)
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
    },
    resetTokens () {
      this.tokensData = null
      this.tokenStyles = []
    },
    handleStyle () {
      EventTokens.getStyles().then(data => {
        data.forEach(file => {
          this.tokenStyles.push(codeTransform(file))
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
pre[class*="language-"] {
  margin: 0;
}

.grid-code {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>
