# babel-plugin-react-jsx-directives

![npm](https://img.shields.io/npm/v/babel-plugin-react-jsx-directives)
![GitHub repo size](https://img.shields.io/github/repo-size/damianc/babel-plugin-react-jsx-directives)
![high usability](https://img.shields.io/badge/usability-%E2%98%85%20high-fa0)

Babel plugin that carries directives to React JSX:
* `rx-if`
* `rx-if / rx-else`
* `rx-if / rx-elseif`
* `rx-if / rx-elseif / rx-else`
* `rx-for`

## Installation

```
npm i babel-plugin-react-jsx-directives
```

## Example of `rx-if`

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

## Example of `rx-for`

```
<ul>
	<li rx-for={(book, idx) in this.state.books}
		key={idx}
	>
		{idx + 1}. {book.title}
	</li>
</ul>
```