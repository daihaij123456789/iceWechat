import axios from 'axios'

const baseUrl = ''
const apiUrl = 'http://rapapi.org/mockjsdata/27295'
class Services {
  getWechatSignature (url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }

  getUserByOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }

  getWechatOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }

  createOrder ({ productId, name, address, phoneNumber }) {
    return axios.post(`${baseUrl}/wechat-pay`, {
      productId,
      name,
      address,
      phoneNumber
    })
  }

  getPayments () {
    return axios.get(`${baseUrl}/admin/payments`)
  }

  fetchHouses () {
    return axios.get(`${apiUrl}/wiki/houses`)
  }
  fetchCities () {
    return axios.get(`${apiUrl}/wiki/cities`)
  }
  fetchHouse (id) {
    return axios.get(`${apiUrl}/wiki/houses/${id}`)
  }

  fetchCharacters () {
    return axios.get(`${apiUrl}/wiki/characters`)
  }

  fetchCharacter (id) {
    return axios.get(`${apiUrl}/wiki/characters/${id}`)
  }

  fetchProducts () {
    return axios.get(`${apiUrl}/api/products`)
  }

  fetchProduct (id) {
    return axios.get(`${apiUrl}/api/products/${id}`)
  }

  fetchUserAndOrders () {
    return axios.get(`${apiUrl}/api/user`)
  }
}

export default new Services()