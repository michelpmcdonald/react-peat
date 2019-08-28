import React, { Component } from 'react'
import CmdButton from './cmdButton'
import PropTypes from 'prop-types'

export default class ReplayComponent extends Component {
    static propTypes = {
      ws: PropTypes.instanceOf(WebSocket)
    }

  replayCommand = commandString => {
    // console.log(commandString)
    this.props.ws.send(JSON.stringify({Cmd: commandString}))
    console.log({'cmd': commandString})
  }

  render() {
    return (
      <div>
        <CmdButton
          onReplayCommand={commandString => this.replayCommand(commandString)}
          txt={'Play'}
          command={'play'} />
        <CmdButton
          onReplayCommand={commandString => this.replayCommand(commandString)}
          txt={'Pause'}
          command={'pause'} />
        <CmdButton
          onReplayCommand={commandString => this.replayCommand(commandString)}
          txt={'Resume'}
          command={'resume'} />
        <CmdButton
          onReplayCommand={commandString => this.replayCommand(commandString)}
          txt={'Quit'}
          command={'quit'} />
      </div>
    )
  }
}
