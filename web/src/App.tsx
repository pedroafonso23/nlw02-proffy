import React from 'react'

import Routes from './routes'

import './assets/styles/global.css' // In react, we import CSS inside JS

// Components have capital initial, like App, so react can diferentiate them from html tags
function App() {
  return (
    // JSX - JavaScript + XML (here we write html inside JS)
    <Routes />
  )
}

export default App