import { BASE_URL, NEWS_PATH, PAGES_PATH, SETUP_PATH } from '../env'

import axios from 'axios'

export const getAppSetup = _ => {
  return axios
    .get(BASE_URL + SETUP_PATH)
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.error('Api: Error when fetching app setup', error)
      throw error
    })
}

export const getPages = _ => {
  return axios
    .get(BASE_URL + PAGES_PATH)
    .then(res => {
      return res.data
    })
    .catch(error => {
      console.error('Api: Error when fetching pages', error)
      throw error
    })
}

export const getNews = _ => {
  return axios
    .get(BASE_URL + NEWS_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching news', error)
      throw error
    })
}
