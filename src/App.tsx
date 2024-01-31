import './App.css'
import { OpenFeatureProvider, OpenFeature } from '@openfeature/react-sdk'
import DevCycleProvider from '@devcycle/openfeature-web-provider'
import { Suspense } from 'react'
import ToggleBot from './components/ToggleBot'
import Description from './components/Description'

if (!process.env.REACT_APP_DEVCYCLE_CLIENT_SDK_KEY) {
  alert('Set your REACT_APP_DEVCYCLE_CLIENT_SDK_KEY environment variable to use the DevCycle React SDK.')
}

const DEVCYCLE_CLIENT_SDK_KEY = process.env.REACT_APP_DEVCYCLE_CLIENT_SDK_KEY || ''
let devCycleProvider: DevCycleProvider

function App() {
    const Fallback = () => (<h2>Initializing...</h2>)

    devCycleProvider = new DevCycleProvider(DEVCYCLE_CLIENT_SDK_KEY, {
        logLevel: 'debug'
    })
    OpenFeature.setContext({
        user_id: 'user123',
        name: 'Jane Doe',
        email: 'jane.doe@email.com'
    })
    OpenFeature.setProvider(devCycleProvider)

    return (
      <OpenFeatureProvider clientName={"DevCycle"}>
          <div className="App">
              <div className="App-header">
                  <p>Demo Application</p>
                  <img
                      height="46"
                      src="/devcycle-togglebot-full-colour.svg"
                      alt="DevCycle"
                  />
              </div>
              <Suspense fallback={<Fallback />}>
                  <div className="App-wrapper">
                      <ToggleBot />
                      <Description />
                  </div>
              </Suspense>
          </div>
      </OpenFeatureProvider>
  )
}

export default App
