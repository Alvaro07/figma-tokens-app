import axios from 'axios'

export default {
  async getTokens (formData) {
    const res = await axios.post('https://figma-tokens-app.netlify.app/', formData)
    return res.data
  }
}
