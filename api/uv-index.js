import axios from 'axios'
export default {
  async getUvIndex (data) {
    const apiId = 'fdf871cedaf3413c6a23230372c30a02'
    try {
      const { data: response } = await axios
        .get('https://api.openweathermap.org/data/2.5/uvi', {
          params: {
            appid: apiId,
            ...data
          }
        })
      return response
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
