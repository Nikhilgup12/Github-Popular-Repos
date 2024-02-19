import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTab: languageFiltersData[0].id,
    languageList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguageList()
  }

  onLanguageTab = id => {
    this.setState(
      {activeTab: id, apiStatus: apiStatusConstants.inProgress},
      this.getLanguageList,
    )
  }

  getLanguageList = async () => {
    const {activeTab} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTab}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.popular_repos.map(language => ({
        name: language.name,
        issuesCount: language.issues_count,
        forksCount: language.forks_count,
        starsCount: language.stars_count,
        avatarUrl: language.avatar_url,
      }))
      this.setState({
        languageList: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {languageList} = this.state
    return (
      <ul className="language-list-container">
        {languageList.map(each => (
          <RepositoryItem languageList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
    />
  )

  loadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  checkResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="github-repo-main-container">
        <div className="github-repo-container">
          <h1 className="github-repo-heading"> Popular </h1>
          <ul className="language-tab-list">
            {languageFiltersData.map(eachTab => (
              <LanguageFilterItem
                tab={eachTab}
                key={eachTab.id}
                onLanguageTab={this.onLanguageTab}
                isActive={eachTab.id === activeTab}
              />
            ))}
          </ul>
          {this.checkResult()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
