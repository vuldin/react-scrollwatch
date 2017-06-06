import React, { Component } from 'react'
import {render} from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import 'sanitize.css'

import withScrollWatch from '../../src'

const Content = ({ ...props }) => {
  const { shownPercent, throttle, onShown, onHidden, ...rest } = props
  return <div style={{...rest}}></div>
}
const ContentWithScrollWatch = withScrollWatch(Content)

class Demo extends Component {
  constructor() {
    super()
    this.origBackground
  }
  onShown(style) {
    style.background = 'red'
    return style
  }
  onHidden(style) {
    style.background = '#272b35'
    return style
  }
  render() {
    return <Wrapper>
      <Title>{`Scrollwatch`}</Title>
      <Instructions>
        <span>{`Scrolling down until you begin to see a `}</span>
        <SpanStyled>{`different colored`}</SpanStyled>
        <span>{` element. Scrolling the div fully into view will change its color.`}</span>
      </Instructions>
      <Filler/>
      <ContentWithScrollWatch
        height={'390px'}
        background={'#272b35'}
        shownPercent={'50%'}
        throttle={200}
        onShown={this.onShown}
        onHidden={this.onHidden}
      />
      <Filler/>
    </Wrapper>
  }
}

injectGlobal`
  @font-face {
    font-family: 'Trade Winds'
    src: url('https://fonts.googleapis.com/css?family=Trade+Winds:400');
  }
  @font-face {
    font-family: 'Roboto Slab'
    src: url('https://fonts.googleapis.com/css?family=Roboto+Slab:400');
  }
  body {
    font-family: 'Roboto Slab', serif;
    font-size: 24px;
    letter-spacing: 1px;
    background: #393f4c;
    color: #c5c8cb;
    text-align: center;
  }
`
const Wrapper = styled.div``
const Title = styled.h1`
  letter-spacing: 4px;
  font-family: 'Trade Winds', cursive;
  font-size: 5em;
  background: white;
  color: #db0100;
`
const Instructions = styled.div`
  padding: 0px 10px 0px 10px;
`
const Filler = styled.div`
  height: 1200px;
`
const SpanStyled = styled.span`
  background: #272b35;
  padding: 5px;
`

render(<Demo/>, document.querySelector('#demo'))
