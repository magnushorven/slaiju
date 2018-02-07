import { h, Component } from 'preact'
import style from './style.less'

export default class RunButton extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div class={style.runButton} onClick={this.props.call}>
				POST
			</div>
		)
	}
}
