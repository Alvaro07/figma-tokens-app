import axios from 'axios'

export default {
  async getTokens (formData) {
    const res = await axios.post('http://localhost:8888/tokens', formData)
    return res.data
  },
  async getStyles (formData) {
    const res = await axios.post('http://localhost:8888/style-dictionary', formData)
    return res.data
  }
}
