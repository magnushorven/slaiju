import { h, Component } from 'preact'
import style from './style.less'
import moment from 'moment'
import RunButton from './button.js'
import TypeImage from './typeImage.js'
import STATICS from './../../statics.js'
import _ from 'underscore'

moment.locale('nb')

export default class Runner extends Component {
	constructor() {
		super()
		this.state = {
			time: 0,
			running: false,
			runType: '',
			repetition: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}



	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate', nextState, this.state);
		if (nextState.runType!==this.state.runType ||
				nextState.time!==this.state.time ||
				nextState.stopTime!==this.state.stopTime ||
				nextState.running!==this.state.running) {
					return true
		}
		return false
	}

	postTime() {
		var bodyParams = {
			runType: this.state.runType,
			startTime: this.state.startTime,
			stopTime: this.state.stopTime,
			reps: this.state.repetition
		}
		console.log('postTime',bodyParams)
		var tryToPost = fetch(STATICS.API, {
			method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(bodyParams)
		})
		tryToPost.then(response => {
			console.log('tryToPostthen', response.json())
		})
		this.setState({ stopTime: null })
	}

	handleChange(event) {
		console.log('setRepetition',event.target.value)
		this.setState({ repetition: event.target.value })
	}
	setRunType(runTypeKey) {
		this.setState({ runType: runTypeKey })
	}

	updateTime = () => {
		this.setState({ time: this.state.time+1 })
	}

	startTime() {
		let startTime = moment().format('x')
		this.timer = setInterval(this.updateTime, 100)
			this.setState({ repetition: '', time: 0, running: true, startTime: startTime, stopTime: null })
	}

	stopTime() {
		let stopTime = moment().format('x')
		this.setState({ stopTime: stopTime, running: false })
		clearInterval(this.timer)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render(props,state) {
		return (
			<div class={style.runner}>
				<h1>
					Are you ready?
				</h1>
				{state.stopTime ? (
					<div>
						<div>started {moment.unix(state.startTime/1000).format('LLL')}, ended {moment.unix(state.stopTime/1000).format('LLL')}, ran for {(state.stopTime-state.startTime)/1000}sec</div>
						How many repetitions: <input type='text' class={style.runInput} value={state.repetition} onKeyUp={this.handleChange} />
						<RunButton call={this.postTime.bind(this)} />
					</div>
				) : null }
				{state.running ? (
					<div>
						<div>{state.time/10}</div>
						<a onClick={this.stopTime.bind(this)}>stop</a>
					</div>
				) : (
					<div>
						<div>
							{_.map(STATICS.WORKOUTTYPES, (image, key) => <TypeImage runTypeImage={image} runTypeKey={key} runTypeActiveKey={state.runType} setRunType={this.setRunType.bind(this)}/>)}
						</div>
						<a onClick={this.startTime.bind(this)}>start</a>
					</div>
				)}
			</div>
		)
	}
}
