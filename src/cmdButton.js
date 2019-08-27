import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CmdButton extends Component {
  static propTypes = {
    onReplayCommand: PropTypes.func.isRequired,
    command: PropTypes.string.isRequired,
    txt: PropTypes.string.isRequired
  }

  render() {
    return (
      <button
        type='button'
        onClick={e => { this.props.onReplayCommand(this.props.command) }} >
        {this.props.txt}
      </button>
    )
  }
}
