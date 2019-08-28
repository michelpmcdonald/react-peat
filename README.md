# react-peat

> react replay control

[![NPM](https://img.shields.io/npm/v/react-peat.svg)](https://www.npmjs.com/package/react-peat) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Under Dev

React control that uses websocket to receive data from go-peat ws service
and sends go-peat commands to control replay

## Install

```bash
npm install --save react-peat
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-peat'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [Michel McDonald](https://github.com/Michel McDonald)
