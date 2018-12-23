import React, { Component } from 'react'
import Mapbox from '@cedarstudios/react-native-cedarmaps'
import { DARK_STYLE_URL, LIGHT_STYLE_URL } from './constants/styles'
import { getToken } from './helpers/auth'

Mapbox.setAccessToken('pk.1234')

const styleMapper = {
  'style://streets-light': LIGHT_STYLE_URL,
  'style://streets-dark': DARK_STYLE_URL,
}

export default class extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
    }
  }

  componentDidMount() {
    const { clientId, clientSecret } = this.props
    getToken({
      clientSecret,
      clientId,
    })
      .then(token => {
        this.setState({
          token,
        })
      })
  }

  render() {
    const { style } = this.props
    const { token } = this.state
    if (!token) return <div/>
    const cedarMapStyle = styleMapper[style] || LIGHT_STYLE_URL
    const tileJsonUrl = `${cedarMapStyle}?access_token=${token}`
    return (
      <Mapbox.MapView
        {...this.props}
        styleURL={tileJsonUrl}
      >
      </Mapbox.MapView>
    )
  }
}

