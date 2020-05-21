import axios from 'axios'

export default {
  async getTokens (formData) {
    const res = await axios.post('http://figma-tokens-app.netlify.app/tokens', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }, formData)
    return res.data
  }
}
