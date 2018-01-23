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
        console.log(news)
        const loading = false
        this.setState({ news, loading })
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const news = this.state.news

    if (this.state.news && !this.state.loading) {
      return this.renderNews(news)
    } else if (this.state.error) {
      return this.renderError()
    } else if (this.state.loading) {
      return this.renderLoading()
    }
  }

  renderNews(news) {
    return (
      <div className="news-list">
        {news.map(newsDetail => (
          <NewsDetail key="newsDetail.id" news={newsDetail} />
        ))}
      </div>
    )
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
