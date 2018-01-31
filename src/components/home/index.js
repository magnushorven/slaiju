import { h, Component } from 'preact';
import style from './style.less';
import STATICS from './../../statics.js'
import moment from 'moment'
import _ from 'underscore'

export default class Home extends Component {
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
	render(props,state) {
		return (
			<div class={style.home}>
				<h1>Stats</h1>
				<div>
					{_.map(_.sortBy(state.sets,'startTime').reverse(), set => <div>{moment.unix(set.startTime/1000).format('LLL')} {set.runType} {set.reps}</div>)}
				</div>
			</div>
		)
	}
}
