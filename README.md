# babel-plugin-react-jsx-directives

![npm](https://img.shields.io/npm/v/babel-plugin-react-jsx-directives)
![GitHub repo size](https://img.shields.io/github/repo-size/damianc/babel-plugin-react-jsx-directives)
![high usability](https://img.shields.io/badge/usability-%E2%98%85%20high-fa0)

Babel plugin that carries directives to React JSX:
* [`$if`](#the-if-directive)
* [`$show`](#the-show-directive)
* [`$hide`](#the-hide-directive)
* [`$hidden`](#the-hidden-directive)
* [`$for`](#the-for-directive)
* [`$switch`](#the-switch-directive)
* [`$class`](#the-class-directive)
* [`$class-*`](#the-class--directive)
* [`$style-*`](#the-style--directive)
* [`$model`](#the-model-directive)
* [`$params`](#the-params-directive)
* [`$dynamic-prop`](#the-dynamic-prop-directive)
* [`$dynamic-event`](#the-dynamic-event-directive)

## Installation

```
npm i babel-plugin-react-jsx-directives
```

### Options

| Option | Type | Description | Default value |
|--------|------|-------------|---------------|
| `prefix` | string | A prefix directives are preceded with; must consist of one or more lowercase characters, plus can contain `$` char(s). | `$` |
| `prefixSeparation` | boolean | Whether a prefix and directive name should be separated with the `-` character. | `false` |

#### Change of the Prefix

Replace the default `$` prefix with `x-`, so e.g., `$if` becomes `x-if`:

```
plugins: [
	['babel-plugin-react-jsx-directives', {
		prefix: 'x',
		prefixSeparation: true
	}]
]
```

## The `$if` Directive

```
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

## The `$show` Directive

```
<div $show={operationPerformed}>
	Operation has finished successfully.
</div>
```

## The `$hide` Directive

```
<div $hide={errors.length === 0}>
	form contains errors
</div>
```

## The `$hidden` Directive

```
<div $hidden={!show}>
	<img src="..." />
</div>
```

### `$hide` vs. `$hidden`

* `$hide` - an element hidden by the `$hide` directive is not visible and takes no space on the space (it is done by CSS `display: none` setting)
* `$hidden` - an element hidden by the `$hidden` directive is not visible on the page but does take space of the page as if it were displayed (it is done by CSS `visibility: hidden` setting)

## The `$for` Directive

```
<ul>
	<li $for={(book, idx) in this.state.books}
		key={idx}
	>
		{idx + 1}. {book.title}
	</li>
</ul>
```

## The `$switch` Directive

```
<div $switch={this.state.n}>
	<p $case={1}>one</p>
	<p $case={2}>two</p>
	<p $case={3}>three</p>
	<p $default>?</p>
</div>
```

## The `$class` Directive

```
<div className="box"
	$class={{isError: this.state.isError, isOk: this.state.isOk}}
>...</div>
```

## The `$class-*` Directive

```
<div className="message"
	$class-fullscreen={this.state.device == 'mobile'}
>...</div>
```

## The `$style-*` Directive

```
<p $style-color={hasError ? 'red' : '#222'}>...</p>
```

```
<p $style-fontSize="20">...</p>
```

> You can use `$style-font-size`, yet the plugin will turn it into `$style-fontSize`, eventually.

* a unit can be specified:

```
<p $style-margin_px="25">...</p>
```

* use `percent` if a unit is meant to be `%`:

```
<div $style-width_percent="75">...</div>
```

> A unit can be specified if a value of the directive is just a string rather than expression.

## The `$model` Directive

* the input below is connected to the `phrase` property of a component state:

```
<input $model="phrase" />
```

* and this one to the `accepted` property of the state:

```
<input type="checkbox" $model="accepted" />
{ this.state.accepted ? 'Accepted' : 'Not accepted' }
```

## The `$params` Directive

The directive allows omitting callback when using render props.

* instead of a callback:

```
<div user={this.state.user}>
	{(user, idx) => {
		return <p>[{ idx }] { user.name } { user.surname } ({ user.age })</p>;
	}}
</div>
```

* you can use the `$params` directive:

```
<div user={this.state.user} $params={(user, idx)}>
	<p>[{ idx }] { user.name } { user.surname } ({ user.age })</p>
</div>
```

## The `$dynamic-prop` Directive

```
<div $dynamic-prop={[propToBind, valueForProp]}>
	...
</div>
```

> It's like `v-bind:[propToBind]="valueForProp"` directive known from the Vue framework.

## The `$dynamic-event` Directive

```
<div $dynamic-event={[eventToListen, eventsHandler]}>
	...
</div>
```

> It's like `v-on:[eventToListen]="eventsHandler"` directive known from the Vue framework.