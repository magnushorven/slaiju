import { h, Component } from 'preact'
import style from './style.less'

export default class GoalGraph extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props)
		let goalPercent = parseFloat((this.props.weeklyProgress/this.props.weeklyGoal)*100).toFixed(2)
		let goalStyle = {
			'width':goalPercent+'%'
		}
		return (
			<div class={style.goalGrapher}>
				{this.props.weeklyProgress} of {this.props.weeklyGoal}
				<div class={style.goalGraphWrapper}>
					<div class={style.goalGraph} style={goalStyle}>
						{goalPercent}%
					</div>
				</div>
			</div>
		)
	}
}
