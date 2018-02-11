import { h, Component } from 'preact';
import style from './style.less';
import runnerStyle from './../runner/style.less';
import STATICS from './../../statics.js'
import _ from 'underscore'

export default class Profile extends Component {
	constructor() {
		super()
		this.state = {
			name:localStorage.getItem('name')
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
	}
	updateLogin() {
		localStorage.setItem('name', this.state.name)
		location.reload(true)
	}
	handleChange(event) {
		console.log('name',event.target.value)
		this.setState({ name: event.target.value })
	}

	render(props,state) {
		return (
			<div class={runnerStyle.container}>
				<h1>Profile</h1>
				<input class={style.inputName} type='text' onKeyUp={this.handleChange} value={this.state.name} />
				<div class={runnerStyle.button} onMouseDown={this.updateLogin.bind(this)}>UPDATE LOGIN</div>
			</div>
		)
	}
}
