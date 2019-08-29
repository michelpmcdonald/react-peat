import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createChart, CrosshairMode } from 'lightweight-charts'

export default class LightChart extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
    this.currentBar = { open: null, high: null, low: null, close: null, time: null, tim: new Date(0) }
    this.currentVol = { value: 0, time: null }
  }

  componentDidMount() {
    this.myChart = createChart(this.chartRef.current, {
      width: 1500,
      height: 625,
      crosshair: {
        mode: CrosshairMode.Normal
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false
      }
    })

    this.myCandleSeries = this.myChart.addCandlestickSeries()
    this.myVolSeries = this.myChart.addHistogramSeries({
      color: '#26a69a',
      lineWidth: 2,
      priceFormat: {
        type: 'volume'
      },
      overlay: true,
      scaleMargins: {
        top: 0.9,
        bottom: 0
      }
    })
  }

  onTrade(trd) {
    if (this.firstBar === true ||
      trd.time.getMinutes() !== this.currentBar.tim.getMinutes()) {
      this.currentBar = {
        open: null,
        high: null,
        low: null,
        close: null,
        time: trd.time / 1000,
        tim: trd.time
      }
      this.currentVol = {
        time: this.currentBar.time,
        value: 0
      }
      this.firstBar = false
    }
    if (trd.time != null) {
      this.mergeTickToBar(trd)
    }
  }

  mergeTickToBar(trd) {
    if (this.currentBar.open === null) {
      this.currentBar.open = trd.amt
      this.currentBar.high = trd.amt
      this.currentBar.low = trd.amt
      this.currentBar.close = trd.amt
      this.currentVol.value = trd.vol
    } else {
      this.currentBar.close = trd.amt
      this.currentBar.high = Math.max(this.currentBar.high, trd.amt)
      this.currentBar.low = Math.min(this.currentBar.low, trd.amt)
      this.currentVol.value += trd.vol
    }
    this.myCandleSeries.update(this.currentBar)
    this.myVolSeries.update(this.currentVol)
  }

  render() {
    return (
      <div ref={this.chartRef} />
    )
  }
}
