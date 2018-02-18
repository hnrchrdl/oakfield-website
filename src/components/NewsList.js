import './NewsList.css'

import React, { Component } from 'react'

import Error from './Error'
import Loading from './Loading'
import NewsDetail from './NewsDetail'
import { getNews } from '../utils/api'

export default class NewsList extends Component {
  state = {
    news: null,
    loading: true,
    error: null
  }
  componentDidMount() {
    getNews()
      .then(news => {
        const loading = false
        this.setState({ news, loading })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { news, loading, error } = this.state

    if (news && !loading) {
      return this.renderNews(news)
    } else if (error) {
      return this.renderError()
    } else if (loading) {
      return this.renderLoading()
    }
  }

  renderNews(news) {
    if (news.length > 0) {
      return (
        <div className="news-list">
          {news.map(newsDetail => (
            <NewsDetail key={newsDetail.id} news={newsDetail} />
          ))}
        </div>
      )
    } else {
      return <div>Keine Beiträge vorhanden.</div>
    }
  }

  renderError() {
    return <Error errorMsg={this.state.error.toString()} />
  }

  renderLoading() {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    )
  }
}
