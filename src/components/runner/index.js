import { h, Component } from 'preact'
import style from './style.less'
import spinner from './spinner.less'
import moment from 'moment'
import RunButton from './runButton.js'
import TypeImage from './typeImage.js'
import STATICS from './../../statics.js'
import _ from 'underscore'
import classNames from 'classnames'

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
		if (this.state.runType==='') { return false}
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
	//<div>started {moment.unix(state.startTime/1000).format('LLL')}, ended {moment.unix(state.stopTime/1000).format('LLL')}, ran for {(state.stopTime-state.startTime)/1000}sec</div>
	render(props,state) {
		return (
			<div class={style.runner}>
				<h1>
					{state.stopTime ? STATICS.HEADERS.REPORTING : state.running ? STATICS.HEADERS.RUNNING : STATICS.HEADERS.START}
				</h1>
				{state.stopTime ? (
					<div>
						<div>Ran for {(state.stopTime-state.startTime)/1000}sec</div>
						<div>Repetitions</div>
						<input type='text' class={style.runInput} value={state.repetition} onKeyUp={this.handleChange} />
						<div className={classNames({[style.button]: true,[style.runButton]: true})} onClick={this.postTime.bind(this)}>POST</div>
					</div>
				) : (
					<div>
						{state.running ? (
							<div>
								<div class={spinner.loader}>
								  <span class={spinner.a}></span>
								  <span class={classNames({[spinner.b]: true, [spinner.spin]: true})}>
								    <span class={spinner.c}></span>
								  </span>
								</div>
								<div class={spinner.time}>{state.time/10}</div>
								<div className={classNames({[style.button]: true,[style.stop]: true})} onClick={this.stopTime.bind(this)}>STOP</div>
							</div>
						) : (
							<div>
								<div class={style.runItWrapper}>
									{_.map(STATICS.WORKOUTTYPES, (image, key) => <TypeImage runTypeImage={image} runTypeKey={key} runTypeActiveKey={state.runType} setRunType={this.setRunType.bind(this)}/>)}
								</div>
								<div className={classNames({[style.button]: true,[style.start]: true, [style.active]: state.runType!==''})} onClick={this.startTime.bind(this)}>START</div>
							</div>
						)}
					</div>
				)}
				</div>
		)
	}
}
