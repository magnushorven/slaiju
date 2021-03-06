import { h, Component } from 'preact';
import style from './style.less';
import style2 from './../runner/style.less';
import STATICS from './../../statics.js'
import TypeImage from './../runner/typeImage.js'
import moment from 'moment'
import _ from 'underscore'

export default class Stats extends Component {
	constructor() {
		super()
		this.state = {
			sets:[],
			runType: 'PUSHUPS'
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

	setRunType(runTypeKey) {
		this.setState({ runType: runTypeKey })
	}
	render(props,state) {
		return (
			<div class={style.container}>
				<h1>Stats</h1>
				<div class={style2.runItWrapper}>
					{_.map(STATICS.WORKOUTTYPES, (image, key) => <TypeImage runTypeImage={image} runTypeKey={key} runTypeActiveKey={state.runType} setRunType={this.setRunType.bind(this)}/>)}
				</div>
				<div class={style.statsWrapper}>
					{_.map(_.sortBy(_.where(state.sets, {runType:state.runType}),'startTime').reverse(), set => <div>{moment.unix(set.startTime/1000).format('L HH:MM:SS')} {set.name} {set.reps}</div>)}
				</div>
			</div>
		)
	}
}
