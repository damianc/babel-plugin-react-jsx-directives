# babel-plugin-react-directives

Babel plugin that carries directives to React JSX:
* `$if/$else`

## Example use

```
<div $if={this.state.showHello}>
    Hello
</div>
<div $else>
    yo
</div>
```