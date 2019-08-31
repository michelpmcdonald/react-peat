import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RateInput extends Component {
  static propTypes = {
    onReplayCommand: PropTypes.func.isRequired,
    command: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.changeTimer = null
  }

  // Wait a little while to make sure the user is done
  // before sending rate change
  handleChange() {
    if (this.changeTimer) {
      clearTimeout(this.changeTimer)
    }
    this.changeTimer = setTimeout(function () {
      if (this.input.current.value < 1) {
        this.input.current.value = this.props.rate
        return
      }
      this.props.onReplayCommand(
        {
          Cmd: this.props.command,
          data: this.input.current.value
        })
    }.bind(this), 750)
  }

  render() {
    return (
      <span>
        <label htmlFor='rate'>Rate</label>
        <input
          type='number'
          id='rate'
          defaultValue={this.props.rate}
          step='1'
          min='1'
          max='1000'
          ref={this.input}
          // Only accept digits, backspace, enter
          onKeyPress={e => {
            if (e.charCode === 8 || e.charCode === 0 || e.charCode === 13) {
              return
            }
            if (!(e.charCode >= 48 && e.charCode <= 57)) {
              e.preventDefault()
            }
          }}
          onChange={e => {
            this.handleChange()
          }}
        />
      </span>
    )
  }
}
