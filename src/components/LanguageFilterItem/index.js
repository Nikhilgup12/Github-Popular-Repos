import './index.css'

const LanguageFilterItem = props => {
  const {tab, onLanguageTab, isActive} = props
  const {language, id} = tab
  const onClickTab = () => {
    onLanguageTab(id)
  }
  const activeTabClass = isActive ? 'active-tab' : ''
  return (
    <li className="language-tab-list">
      <button
        className={`tab-btn ${activeTabClass}`}
        onClick={onClickTab}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
