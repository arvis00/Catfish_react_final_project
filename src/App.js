import React from 'react'
import './App.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={() => <route.component />}
              exact={route.isExact}
            />
          ))}
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
