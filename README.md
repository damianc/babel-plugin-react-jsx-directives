# babel-plugin-react-directives

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