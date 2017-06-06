import React from 'react'
import ReactDOM from 'react-dom'

export default function withScrollWatch(WrappedComponent) {
  return class Scrollwatch extends React.Component {
    constructor(props) {
      super(props)
      const { shownPercent, throttle, onShown, onHidden, ...oldStyle } = this.props
      this.throttle = throttle || 250
      if(shownPercent) {
        this.shownPercent = parseFloat(shownPercent) / 100
        if(isNaN(this.shownPercent)) {
          this.shownPercent = 0.5
        }
      } else this.shownPercent = 0.5
      this.scheduleCheckVis = () => {
        if(this.timeoutId === undefined) {
          this.timeoutId = window.setTimeout(function() {
            this.checkVis(this.domNode)
            window.clearTimeout(this.timeoutId)
            delete this.timeoutId
          }.bind(this), this.throttle)
        }
      }
      this.state = { visible: false, ...oldStyle }
    }
    componentDidMount() {
      this.domNode = ReactDOM.findDOMNode(this)
      document.addEventListener('visibilitychange', this.scheduleCheckVis)
      document.addEventListener('scroll', this.scheduleCheckVis)
      window.addEventListener('resize', this.scheduleCheckVis)
    }
    componentWillUnmount() {
      document.removeEventListener('visibilitychange', this.scheduleCheckVis)
      document.removeEventListener('scroll', this.scheduleCheckVis)
      window.removeEventListener('resize', this.scheduleCheckVis)
    }
    checkVis(target) {
      let rect = target.getBoundingClientRect()
      let wHeight = window.innerHeight
      let wWidth = window.innerWidth

      const x = target.clientHeight * this.shownPercent
      let topVisible = 0 <= rect.top + x && rect.top + x <= wHeight
      let bottomVisible = 0 <= rect.bottom  - x && rect.bottom - x <= wHeight
      let isVisible = topVisible && bottomVisible

      if(isVisible) {
        let computedStyle = window.getComputedStyle(target, false)
        let isDocShown = !document.hidden
        let isDisplayed = computedStyle.getPropertyValue('display') !== 'none'
        let isOpaque = computedStyle.getPropertyValue('opacity') !== 0
        let isVisible = computedStyle.getPropertyValue('visibility') !== 'hidden'
        isVisible = isDocShown || isDisplayed || isOpaque || isVisible
      }

      if(isVisible !== this.state.visible) {
        let newStyle = {}
        const { shownPercent, throttle, onShown, onHidden, ...oldStyle } = this.props
        if(isVisible) {
          if(this.props.onShown) newStyle = onShown(oldStyle)
        } else {
          if(this.props.onHidden) newStyle = onHidden(oldStyle)
        }
        this.setState({ visible: isVisible, ...newStyle })
      }
    }
    render() {
      const { shownPercent, throttle, onShown, onHidden, ...oldStyle } = this.props
      const { visible, ...stateStyle } = this.state
      const style = Object.assign({}, oldStyle, stateStyle)
      return <WrappedComponent
        {...style}
        shownPercent={shownPercent}
        throttle={throttle}
        onShown={onShown}
        onHidden={onHidden}/>
    }
  }
}
