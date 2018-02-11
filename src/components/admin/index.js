import { h, Component } from 'preact';
import moment from 'moment'
import style from './style.less';
import STATICS from './../../statics.js'
import _ from 'underscore'

export default class Admin extends Component {
	constructor() {
		super()
		this.state = {
			sets:[],
			weeklyGoal:null
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {
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

		var tryToGetGoal = fetch(STATICS.GOALAPI, {
			method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		  }
		})
		.then(response => response.json())
    .then(responseJson => {
			console.log('tryToGetThen', responseJson)
			this.setState({ weeklyGoal: responseJson[0].weeklyGoal })
    })
	}
	deleteItem(set) {
		var bodyParams = {
			id: set._id
		}
		console.log('deleteItem',set,bodyParams)
		var tryToGet = fetch(STATICS.API, {
			method: 'delete',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(bodyParams)
		})
		.then(response => response.json())
		.then(responseJson => {
			console.log('tryToGetThen', responseJson)
			responseJson.success && this.setState({ sets: _.filter(this.state.sets, s => s._id !== set._id) })
		})
	}
	updateWeeklyGoal() {
			var bodyParams = {
				weeklyGoal: this.state.weeklyGoal
			}
			console.log('putGoal',bodyParams)
			var tryToPut = fetch(STATICS.GOALAPI, {
				method: 'PUT',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(bodyParams)
			})
			tryToPut.then(response => {
				console.log('tryToPutThen', response.json())
			})
	}
	handleChange(event) {
		console.log('weeklyGoal',event.target.value)
		this.setState({ weeklyGoal: event.target.value })
	}

	render(props,state) {
		let weeklyGoalInputState = state.weeklyGoal===null?'DISABLED':''
		return (
			<div class={style.container}>
				<h1>Admin</h1>
				<div class={style.weeklyGoalWrapper}>
					<div>Weekly Goal</div>
					{this.state.weeklyGoal===null ? <input type='text' onKeyUp={this.handleChange} value={this.state.weeklyGoal} DISABLED /> : <input type='text' onChange={this.handleChange} value={this.state.weeklyGoal} />}
					<div onMouseDown={state.weeklyGoal !== null ? this.updateWeeklyGoal.bind(this):null}>UPDATE GOAL</div>
				</div>
				<div>
					{_.map(_.sortBy(state.sets,'startTime').reverse(), set => <div>{moment.unix(set.startTime/1000).format('LLL')} {set.runType} {set.reps}<a onClick={this.deleteItem.bind(this,set)}>x</a></div>)}
				</div>
			</div>
		)
	}
}
