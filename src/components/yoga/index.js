import { h, Component } from 'preact'
import { Link } from 'preact-router/match';
import style from './style.less'
import moment from 'moment'
import YogaLogo from './yogaLogo.js'
import STATICS from './../../statics.js'
import _ from 'underscore'
import classNames from 'classnames'

moment.locale('nb')

export default class Yoga extends Component {
	constructor() {
		super()
		this.state = {
			time: 0
		}
		this.handleChange = this.handleChange.bind(this)
	}
	componentWillMount() {
	}
	getSets() {
		var tryToGet = fetch(STATICS.API, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.then(responseJson => {
			console.log('tryToGetThen', responseJson)
			this.setState({ sets: responseJson })
		})
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}

	postTime() {
	}

	handleChange(event) {
		console.log('setRepetition',event.target.value)
		this.setState({ repetition: event.target.value })
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	
	render(props,state) {
		return (
			<div class={style.container}>
				Yoga
				<YogaLogo/>
			</div>
		)
	}
}
