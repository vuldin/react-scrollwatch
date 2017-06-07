import React, { Component } from 'react'
import {render} from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import FontAwesome from 'react-fontawesome'
import 'sanitize.css'

const colors = {
  offwhite: '#f5f5f6',
  primary: {
    normal: '#f57f17',
    light: '#ffb04c',
    dark: '#bc5100',
    text: '#000000',
  },
  secondary: {
    normal: '#81d4fa',
    light: '#b6ffff',
    dark: '#4ba3c7',
    text: '#000000',
  },
}

import withScrollWatch from '../../src'

const Content = ({ ...props }) => {
  const { shownPercent, throttle, onShown, onHidden, ...rest } = props
  return <div style={{...rest}}></div>
}
const ContentWithScrollWatch = withScrollWatch(Content)

class Demo extends Component {
  onShown(style) {
    style.background = colors.secondary.dark
    return style
  }
  onHidden(style) {
    style.background = colors.secondary.light
    return style
  }
  render() {
    return <Wrapper>
      <Title>{`react-scrollwatch`}</Title>
      <Instructions>
        <span>{`Scrolling down until you begin to see a `}</span>
        <SpanLight>{`different colored`}</SpanLight>
        <span>{` element. Scrolling the div fully into view will`}</span>
        <SpanDark>{` change its color`}</SpanDark>
        <span>{`.`}</span>
      </Instructions>
      <Filler height={1200}/>
      <ContentWithScrollWatch
        height={'390px'}
        background={colors.secondary.light}
        shownPercent={'50%'}
        throttle={200}
        onShown={this.onShown}
        onHidden={this.onHidden}
      />
      <Filler height={1000}/>
      <Instructions>
        <span>{`See the `}</span>
        <a href={'https://github.com/vuldin/react-scrollwatch'}><FontAwesome name='github-alt' />github repo</a>
        <span>{` for details.`}</span>
      </Instructions>
    </Wrapper>
  }
}

injectGlobal`
  @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
  @font-face {
    font-family: 'Roboto Slab'
    src: url('https://fonts.googleapis.com/css?family=Roboto+Slab:400');
  }
  body {
    font-family: 'Roboto Slab', serif;
    font-size: 24px;
    letter-spacing: 1px;
    background: ${colors.offwhite};
    color: ${colors.primary.text};
    text-align: center;
  }
`
const Wrapper = styled.div``
const Title = styled.h1`
  margin: 0;
  letter-spacing: 4px;
  font-size: 5em;
  background: ${colors.secondary.dark};
`
const Instructions = styled.div`
  background: ${colors.primary.normal};
  padding: 15px;
`
const Filler = styled.div`
  height: ${props => props.height}px;
`
const SpanLight = styled.span`
  background: ${colors.secondary.light};
  padding: 5px;
`
const SpanDark = styled.span`
  background: ${colors.secondary.dark};
  padding: 5px;
`

render(<Demo/>, document.querySelector('#demo'))
