import { h, Component } from 'preact'
import style from './style.less'
import classNames from 'classnames'

export default class TypeImage extends Component {
	constructor(props) {
		super(props)
	}

	render(props,state) {
		return (
			<div className={classNames({[style.typeImage]: true, [style.typeImageActive]: props.runTypeKey===props.runTypeActiveKey})} onClick={props.setRunType.bind(this,props.runTypeKey)}>
				<img src={'assets/icons/'+props.runTypeImage} />
				<div class={style.typeImageText}>{props.runTypeKey}</div>
			</div>
		)
	}
}
