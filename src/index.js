import React, { Component } from 'react'
import ReplayComponent from './replayComponent'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  ws = new WebSocket('ws://localhost:8080/ws')

  render() {
    const {
      text
    } = this.props

    return (
      <div className={styles.test}>
        <ReplayComponent ws={this.ws} />
      </div>
    )
  }
}
