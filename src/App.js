import './App.css'

import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import EndCall from './components/EndCall'
import Error from './components/Error'
import UserNameRoute from './components/UserNameRoute'
import VideoRoom from './components/VideoRoom'
import WaitingRoom from './components/WaitingRoom'
import { UserContext } from './context/UserContext'

// Theme Configuration

let primary = process.env.REACT_APP_PALETTE_PRIMARY || "#b779ff"
let secondary = process.env.REACT_APP_PALETTE_SECONDARY || "#d6219c"

const theme = () => {
  return createTheme({
    palette: {
      type: "light",
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      bodyBackground: {
        black: "#131415",
      },
      callBackground: {
        main: "#20262D",
      },
      toolbarBackground: {
        main: "#41464D",
      },
      activeButtons: {
        green: "#1C8731",
        red: "#D50F2C",
      },
    },
  })
}

function App() {
  const [user, setUser] = useState({
    videoFilter: {
      filterName: false,
      filterPayload: false,
    },
    defaultSettings: {
      publishAudio: true,
      publishVideo: true,
      audioSource: undefined,
      videoSource: undefined,
      audioOutput: undefined,
    },
  })
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <ThemeProvider theme={theme()}>
      <Router>
        <UserContext.Provider value={userValue}>
          <Switch>
            <Route path="/room/:roomName/:sessionId/end">
              <EndCall />
            </Route>
            <UserNameRoute exact path="/room/:roomName" component={VideoRoom} />

            <Route path="/error" component={Error}></Route>
            <Route exact path="/" component={WaitingRoom}></Route>
            <Route path="*">
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
