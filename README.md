# render-react-from-cms

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

`render-react-from-cms` provides a straight forward API for rendering HTML and React from a wysiwyg editor. This can be used with a custom wordpress plugin to allow CMS users to generate complex React code. It works server side too.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Usage

```js
// in your react app ..
import RenderReact from 'render-react-from-cms'
import Button from './button'

export default class extends Component {
  state = {
    content: ''
  }

  async componentDidMount () {
    const res = await fetch('/my-cms-endpoint')
    const data = await res.json()
    // "
    // <div>
    //  <h1>Im content wordpress and react component</h1>
    //  <div react-component='Button' react-props='{..}'></div>
    // </div>
    // "

    this.setState({ content: data })
  }
  ..

  render () {
    return (
      <RenderReact html={this.state.content} componentMap={{ Button }} />
    )
  }
}
```

## API

| Param          | Type    | functionality | required |
|----------------|---------|-----------------|-----------------|
| html           | String | html you want to parse into react | true |
| componentMap       | Object    | instances of react components you're using | true |
| componentAttribute | String | override default attributes (default to react-component) | false |
| propsAttribute | String | override default attributes (default to react-props) | false |

Questions? Feedback? [Please let me know](https://github.com/hanford/render-react-from-cms/issues/new)

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```
Copyright © 2017-present [Jack Hanford](http://jackhanford.com), jackhanford@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
