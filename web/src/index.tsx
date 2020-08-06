import React from 'react'
import ReactDOM from 'react-dom' // Allow react to work with the html element tree (DOM)
import App from './App'

// Render is used only once, and it will look for the element div.root in public/index.html and it will inject html-like-code in this div 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)