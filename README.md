# babel-plugin-react-jsx-directives

![npm](https://img.shields.io/npm/v/babel-plugin-react-jsx-directives)
![GitHub repo size](https://img.shields.io/github/repo-size/damianc/babel-plugin-react-jsx-directives)
![high usability](https://img.shields.io/badge/usability-%E2%98%85%20high-fa0)

Babel plugin that carries directives to React JSX:
* `$if`
* `$if / $else`

## Installation

```
npm i babel-plugin-react-jsx-directives
```

## Example use

```
<div $if={this.state.showHello}>
    Hello
</div>
<div $else>
    yo
</div>
```