import React, {Component} from 'react'
import {render} from 'react-dom'

import RenderReact from '../../src'

class Demo extends Component {
  render() {
    const content = `<div react-component="Button" react-props='{"text": "jack!"}'></div>`

    return (
      <div>
        <h1>render-react-from-cms Demo</h1>

        <div style={{backgroundColor: `rgba(0,0,0,0.1)`}}>
          <code>
            {content}
          </code>
        </div>

        <RenderReact html={content} componentMap={{ Button }} />
      </div>
    )
  }
}

const Button = ({ text }) => (
  <button>{text}</button>
)

render(<Demo/>, document.querySelector('#demo'))
