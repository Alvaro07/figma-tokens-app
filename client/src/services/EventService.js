import axios from 'axios'

export default {
  async getEvents () {
    const res = await axios.get('http://localhost:8000/events')
    return res.data
  },
  async getEventSingle (eventId) {
    const res = await axios.get('http://localhost:8000/events/' + eventId)
    return res.data
  }
}
