<template>
  <form class="mb-10" :class="{ 'opacity-50 pointer-events-none': disabled}" >
    <div class="flex justify-center mb-8">
      <input-text ref="authInput" v-model="authToken" extra-class="flex-auto mr-4" placeholder="Auth token" />
      <input-text ref="idFileInput" v-model="idFile" extra-class="flex-1" placeholder="Id File" />
    </div>

    <div class="flex justify-center mb-4">
      <input-text v-model="tokenName" extra-class="mr-4 " placeholder="Token name" ref="addInput" />
      <custom-select :options="typeOptions" v-model="tokenType" class="addSelect" />

      <div class="ml-4 flex items-center">
        <custom-button size="small" type="green" @click="handleAdd" :disabled="isDisabledAdd">Add token</custom-button>
      </div>

      <div class="ml-8 pl-8 flex items-center border-l">
        <custom-button @click="handleSearch" :disabled="disabledSearch">Get tokens</custom-button>
      </div>
    </div>
  </form>
</template>

<script>
import Button from '@/components/Button/Button'
import Select from '@/components/Select/Select'
import InputText from '@/components/InputText/InputText'

export default {
  name: 'TokenForm',
  components: {
    CustomButton: Button,
    CustomSelect: Select,
    InputText
  },
  props: {
    isDisabledSearch: {
      type: Boolean
    },
    tokens: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      authToken: '',
      idFile: '',
      tokenName: '',
      tokenType: 0,
      typeOptions: [
        'color',
        'text',
        'typography',
        'space',
        'radius',
        'breakpoint',
        'opacity',
        'border',
        'shadow'
      ]
    }
  },
  computed: {
    isDisabledAdd () {
      return !this.tokenName
    },
    disabledSearch () {
      return !(this.tokens.length && this.authToken && this.idFile)
    }
  },
  methods: {
    handleAdd () {
      this.$emit('onAddToken', {
        name: this.tokenName,
        type: this.typeOptions[this.tokenType]
      })
      this.resetPanel()
    },
    handleSearch () {
      this.$emit('onSearch', {
        authToken: this.authToken,
        idFile: this.idFile
      })
      this.resetPanel()
    },
    resetPanel () {
      this.tokenType = 0
      this.tokenName = ''
      this.tokensData = null
    }
  }
}
</script>

<style>
</style>
