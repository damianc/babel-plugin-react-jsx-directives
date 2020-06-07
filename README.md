# babel-plugin-react-jsx-directives

![npm](https://img.shields.io/npm/v/babel-plugin-react-jsx-directives)
![GitHub repo size](https://img.shields.io/github/repo-size/damianc/babel-plugin-react-jsx-directives)
![high usability](https://img.shields.io/badge/usability-%E2%98%85%20high-fa0)

Babel plugin that carries directives to React JSX:
* `rx-if`
* `rx-if / rx-else (rx-elseif)`
* `rx-for`
* `rx-switch / rx-case (rx-default)`
* `rx-class`
* `rx-class-*`
* `rx-style-*`

## Installation

```
npm i babel-plugin-react-jsx-directives
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `prefix` | string | A prefix directives are preceded with; must consist of one or more lowercase characters. |

#### Change of the Prefix

```
plugins: [
	['babel-plugin-react-jsx-directives', { prefix: 'x' }]
]
```

## The `rx-if` Directive

```
<p rx-if={this.state.status == 'available'}>
	I'm available
</p>
<p rx-elseif={this.state.status == 'busy'}>
	I'm busy now
</p>
<p rx-else>
	I'm certainly AFK
</p>
```

## The `rx-for` Directive

```
<ul>
	<li rx-for={(book, idx) in this.state.books}
		key={idx}
	>
		{idx + 1}. {book.title}
	</li>
</ul>
```

## The `rx-switch` Directive

```
<div rx-switch={this.state.n}>
	<p rx-case={1}>1</p>
	<p rx-case={2}>2</p>
	<p rx-case={3}>3</p>
	<p rx-default>?</p>
</div>
```

## The `rx-class` Directive

```
<div className="box"
	rx-class={{isError: this.state.isError, isOk: this.state.isOk}}
>...</div>
```

## The `rx-class-*` Directive

```
<div className="message"
	rx-class-fullscreen={this.state.device == 'mobile'}
>...</div>
```

## The `rx-style-*` Directive

```
<p rx-style-color={hasError ? 'red' : '#222'}>...</p>
```

```
<p rx-style-fontSize="20">...</p>
```

> You can use `rx-style-font-size`, yet the plugin will turn it into `rx-style-fontSize`, eventually.

* a unit can be specified:

```
<p rx-style-margin_px="25">...</p>
```

* use `percent` if a unit is meant to be `%`:

```
<div rx-style-width_percent="75">...</div>
```

> A unit can be specified if a value of the directive is just a string rather than expression.