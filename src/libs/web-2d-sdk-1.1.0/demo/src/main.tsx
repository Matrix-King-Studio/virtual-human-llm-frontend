import React from 'react'
import ReactDOM from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import './index.less'
import routes from './routes'
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/3d">{renderRoutes(routes)}</BrowserRouter>{' '}
  </React.StrictMode>,
  document.getElementById('root'),
)
