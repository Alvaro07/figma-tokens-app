import axios from 'axios'

export default {
  async getTokens (formData) {
    const res = await axios.post('https://figma-tokens-app-server.herokuapp.com/tokens', formData)
    return res.data
  },
  async getStyles (formData) {
    const res = await axios.post('https://figma-tokens-app-server.herokuapp.com/style-dictionary', formData)
    return res.data
  }
}
