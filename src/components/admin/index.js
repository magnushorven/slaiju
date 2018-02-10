import { h, Component } from 'preact';
import moment from 'moment'
import style from './style.less';
import STATICS from './../../statics.js'
import _ from 'underscore'

export default class Admin extends Component {
	constructor() {
		super()
		this.state = {
			sets:[]
		}
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

	render(props,state) {
		return (
			<div class={style.container}>
				<h1>Admin</h1>
				<div>
					{_.map(_.sortBy(state.sets,'startTime').reverse(), set => <div>{moment.unix(set.startTime/1000).format('LLL')} {set.runType} {set.reps}<a onClick={this.deleteItem.bind(this,set)}>x</a></div>)}
				</div>
			</div>
		)
	}
}
