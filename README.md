# babel-plugin-react-jsx-directives

![npm](https://img.shields.io/npm/v/babel-plugin-react-jsx-directives)
![GitHub repo size](https://img.shields.io/github/repo-size/damianc/babel-plugin-react-jsx-directives)
![high usability](https://img.shields.io/badge/usability-%E2%98%85%20high-fa0)

Babel plugin that carries directives to React JSX:
* `$if`
* `$if / $else`
* `$if / $elseif / $else`

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

<p $if={this.state.status == 'available'}>
	I'm available
</p>
<p $elseif={this.state.status == 'busy'}>
	I'm busy now
</p>
<p $else>
	I'm certainly AFK
</p>
```