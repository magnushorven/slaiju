import { h, Component } from 'preact'
import style from './style.less'

export default class Calcer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div class={style.calcer} onClick={this.props.f.bind(this,this.props.a)}>
				{this.props.b}
			</div>
		)
	}
}
