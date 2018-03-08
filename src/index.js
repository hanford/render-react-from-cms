import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class RenderReactCMS extends PureComponent {
  static defaultProps = {
    componentAttribute: 'react-component',
    propsAttribute: 'react-props'
  }

  componentDidMount() {
    this.renderClientSide()
  }

  renderClientSide = () => {
    // bail if window is undefined, this means we're not client side
    if (typeof window === 'undefined') return

    const { html, componentMap, componentAttribute, propsAttribute } = this.props

    this.reactContainer.innerHTML = html

    const nodeList = this.reactContainer.querySelectorAll(`[${componentAttribute}]`)

    // loop over elements that match our componentAttribute `<div react-component>`
    Array.from(nodeList).forEach(node => {
      const component = componentMap[node.getAttribute(componentAttribute)]
      const props = this.getPropsFromAttribute(node.getAttribute(propsAttribute))
      const element = React.createElement(component, props)

      // render the newly created element into the subtree using an ReactDOM api in order to maintain the tree
      ReactDOM.unstable_renderSubtreeIntoContainer(this, element, node, () => node.replaceWith(...node.childNodes))
    })
  }

  getPropsFromAttribute = componentProps => {
    const {
      html,
      componentMap,
      componentAttribute,
      propsAttribute,
      contextWrapper,
      ...additionalProps
    } = this.props

    if (!componentProps) return additionalProps

    let props

    try {
      props = JSON.parse(componentProps)
    } catch (error) {
      console.warn(`Error parsing ${propsAttribute}`, componentProps)
    }

    return {
      ...props,
      ...additionalProps
    }
  }

  renderServerSide = () => {
    // bail if window is defined .. this means we're not server side
    if (typeof window === 'object') return null

    const ReactDOMServer = require('react-dom/server')
    const cheerio = require('cheerio')

    const {
      html,
      componentAttribute,
      propsAttribute,
      componentProps,
      componentMap,
      contextWrapper
    } = this.props

    const $ = cheerio.load(html)

    $(`[${componentAttribute}]`).each((i, element) => {
      const component = componentMap[element.attribs[componentAttribute]]

      if (!component) return console.warn(`Error, Component matching ${component} not passed in`)

      const props = this.getPropsFromAttribute(element.attribs[propsAttribute])

      let reactElement = React.createElement(component, props)

      const renderedReact = ReactDOMServer.renderServerSide(reactElement)

      if (contextWrapper) {
        // <RenderReact contextWrapper={(props) => <StaticRouter {...props} />} />
        reactElement = React.createElement(contextWrapper, null, reactElement)
      }

      $(element).replaceWith(renderedReact)
    })

    return $('body').html()
  }

  render () {
    return (
      <div
        ref={element => (this.reactContainer = element)}
        dangerouslySetInnerHTML={{ __html: this.renderServerSide() }}
      />
    )
  }
}
