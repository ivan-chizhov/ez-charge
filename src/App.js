import React from 'react'
import { Route, Switch } from 'wouter'
import DemoPage from './pages/DemoPage'
import { RecoverPasswordPage, LoginPage, SignUpPage } from './pages/AuthPages'
import CheckInPage from './pages/CheckInPage'
import { isLoggedIn } from './auth'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn())

  const handleAuth = React.useCallback(() => {
    setLoggedIn(isLoggedIn())
  }, [])

  return loggedIn ? (
    <Switch>
      <Route path="/">{() => <CheckInPage onLogout={handleAuth} />}</Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/">{() => <LoginPage onLogin={handleAuth} />}</Route>
      <Route path="/sign-up">{() => <SignUpPage onLogin={handleAuth} />}</Route>
      <Route path="/forgot-password">{() => <RecoverPasswordPage />}</Route>
    </Switch>
  )
}

export default App
