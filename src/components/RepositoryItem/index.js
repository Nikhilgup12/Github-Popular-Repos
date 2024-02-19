import './index.css'

const RepositoryItem = props => {
  const {languageList} = props
  const {avatarUrl, issuesCount, name, forksCount, starsCount} = languageList
  return (
    <li className="language-list">
      <div>
        <img src={avatarUrl} className="avatar-image" alt={name} />{' '}
      </div>
      <p className="name"> {name} </p>
      <div className="language-stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star"
          alt="stars"
        />
        <p> {`${starsCount} stars`} </p>
      </div>
      <div className="language-stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="forks"
          alt="forks"
        />
        <p> {`${forksCount} forks`} </p>
      </div>
      <div className="language-stars">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="issues"
          alt="open issues"
        />
        <p> {`${issuesCount} issues`} </p>
      </div>
    </li>
  )
}

export default RepositoryItem
