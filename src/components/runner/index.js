import { h, Component } from 'preact'
import { Link } from 'preact-router/match';
import style from './style.less'
import spinner from './spinner.less'
import moment from 'moment'
import RunButton from './runButton.js'
import Calcer from './calcer.js'
import GoalGraph from './goalGraph.js'
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
			runType: 'PUSHUPS',
			repetition: 0,
			sets: [],
			weeklyGoal: null,
			name: localStorage.getItem('name')
		}
		this.handleChange = this.handleChange.bind(this)
	}
	componentWillMount() {
		this.getSets()

		var tryToGetGoal = fetch(STATICS.GOALAPI, {
			method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		  }
		})
		.then(response => response.json())
    .then(responseJson => {
			console.log('tryToGetGoalThen', responseJson)
			this.setState({ weeklyGoal: responseJson[0].weeklyGoal })
    })
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
		console.log('shouldComponentUpdate', nextState, this.state);
		if (nextState.runType!==this.state.runType ||
				nextState.time!==this.state.time ||
				nextState.stopTime!==this.state.stopTime ||
				nextState.running!==this.state.running ||
				nextState.repetition!==this.state.repetition ||
				nextState.sets!==this.state.sets ||
				nextState.sets.length!==this.state.sets.length ||
				nextState.weeklyGoal!==this.state.weeklyGoal) {
					return true
		}
		return false
	}

	postTime() {
		var bodyParams = {
			runType: this.state.runType,
			startTime: this.state.startTime,
			stopTime: this.state.stopTime,
			reps: this.state.repetition,
			name: this.state.name
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
		this.setState({ stopTime: null})
		this.getSets()
	}

	handleChange(event) {
		console.log('setRepetition',event.target.value)
		this.setState({ repetition: event.target.value })
	}
	calcit(value) {
		console.log('calcit',value)
		let val = this.state.repetition + value < 0 ? 0 : this.state.repetition + value
		this.setState({ repetition: val })
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
			this.setState({ repetition: 0, time: 0, running: true, startTime: startTime, stopTime: null })
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
	//<input type='text' class={style.runInput} value={state.repetition} onKeyUp={this.handleChange} />
	render(props,state) {
		return (
			<div class={style.container}>
				<h1>
					{state.stopTime ? STATICS.HEADERS.REPORTING : state.running ? STATICS.HEADERS.RUNNING : STATICS.HEADERS.START}
				</h1>
				{state.name ? (
					<div>
					{state.stopTime ? (
						<div>
							<h2>
								{(state.stopTime-state.startTime)/1000} sec, repetitions:
							</h2>
							<div class={style.calcerWrapper}>
								<Calcer f={this.calcit.bind(this)} a={-5} b="-5" />
								<Calcer f={this.calcit.bind(this)} a={-1} b="-1" />
								<Calcer f={this.calcit.bind(this)} a={1} b="+1" />
								<Calcer f={this.calcit.bind(this)} a={5} b="+5" />
							</div>
							<div class={style.calcerValue}>{state.repetition}</div>
							{state.repetition>0 ? (<div className={classNames({[style.button]: true,[style.runButton]: true})} onClick={this.postTime.bind(this)}>POST</div>) : null}
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
									<GoalGraph weeklyGoal={state.weeklyGoal} weeklyProgress=
									{_.reduce(
										_.map(
											_.filter(
												state.sets, s => s.runType===state.runType && moment.unix(s.stopTime/1000).format('W') === moment().format('W')
											),
											s => s.reps
										),
										(i,o) =>  {return i+o},0
									)}
									/>
									<div className={classNames({[style.button]: true,[style.start]: true, [style.active]: state.runType!==''})} onClick={this.startTime.bind(this)}>START</div>
								</div>
							)}
						</div>
					)}
					</div>
				): (
					<Link activeClassName="active" href="/profile">Login to GO!</Link>
				)}
			</div>
		)
	}
}
