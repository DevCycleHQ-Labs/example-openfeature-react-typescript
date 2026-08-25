import { useStringFlagValue, useBooleanFlagValue, OpenFeature } from '@openfeature/react-sdk'
import DevCycleReactProvider from '@devcycle/openfeature-react-provider'
import classNames from 'classnames'

function ToggleBot() {
  /**
   * The useVariableValue hook will return the current value of a variable.
   * If no value is defined for the current user, the default value will be returned.
   */
  const shouldWink = useBooleanFlagValue('togglebot-wink', false)
  const spinSpeed = useStringFlagValue('togglebot-speed', 'off')

  const devcycleClient = (OpenFeature.getProvider() as DevCycleReactProvider).devcycleClient
  const { variationName = 'Default' } = devcycleClient?.allFeatures()?.['hello-togglebot'] ?? {}

  return (
    <div className="App-content">
      <div className="ToggleBot-message">
        "{getMessage(spinSpeed)}"
      </div>
      <img
        src={getImageSource(spinSpeed, shouldWink)}
        className={classNames(['ToggleBot-logo', `spin-${spinSpeed}`])}
        alt="togglebot"
      />
      <div className="ToggleBot-variation">
        Serving Variation: <b>"{variationName}"</b>
      </div>
    </div>
  );
}

const getMessage = (spinSpeed: string) => {
  switch (spinSpeed) {
    case 'slow':
      return 'Awesome, look at you go!'
    case 'fast':
      return 'This is fun!'
    case 'off-axis':
      return '...I\'m gonna be sick...'
    case 'surprise':
      return 'What the unicorn?'
    default:
      return 'Hello! Nice to meet you.'
  }
}

const getImageSource = (spinSpeed: string, shouldWink: boolean) => {
  if (spinSpeed === 'surprise') return 'unicorn.svg'
  return shouldWink ? 'togglebot-wink.svg' : 'togglebot.svg'
}

export default ToggleBot;
