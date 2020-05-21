import axios from 'axios'

export default {
  async getTokens (formData) {
    const res = await axios.post('http://localhost:8000/tokens', formData)
    return res.data
  }
}
