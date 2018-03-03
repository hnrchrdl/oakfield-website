import {
  ARTIST_PATH,
  BASE_URL,
  FAQ_PATH,
  MEDIENPARTNER_PATH,
  NEWS_PATH,
  PAGES_PATH,
  SEND_BEWERBUNG_PATH,
  SETUP_PATH,
  SPONSOR_PATH,
  TICKET_PATH
} from '../env'

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

export const getArtists = _ => {
  return axios
    .get(BASE_URL + ARTIST_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching artists', error)
      throw error
    })
}

export const getTickets = _ => {
  return axios
    .get(BASE_URL + TICKET_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching tickets', error)
      throw error
    })
}

export const getFAQ = _ => {
  return axios
    .get(BASE_URL + FAQ_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching faqs', error)
      throw error
    })
}

export const getSponsoren = _ => {
  return axios
    .get(BASE_URL + SPONSOR_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching sponsors', error)
      throw error
    })
}

export const getMedienpartner = _ => {
  return axios
    .get(BASE_URL + MEDIENPARTNER_PATH)
    .then(res => {
      return res.data.filter(item => item.status === 'publish')
    })
    .catch(error => {
      console.error('Api: Error when fetching mediapartner', error)
      throw error
    })
}
export const sendBewerbung = formData => {
  console.log(formData)
  return axios
    .post(BASE_URL + SEND_BEWERBUNG_PATH, formData);
}
