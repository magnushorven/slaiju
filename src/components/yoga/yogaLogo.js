import { h, Component } from 'preact'
import style from './style.less'
const Parallax = require('parallax-js')

export default class YogaLogo extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		this.parallax = new Parallax(this.scene)
	}
	componentWillUnmount() {
		this.parallax.disable()
	}

	render() {
		return (
			<div class={style.scene}>
				<div id='scene' ref={el => this.scene = el} class={style.yogaParallax}>
					<div class={style.layer} data-depth='0.1'><img src={'assets/yoga/images/circle.png'} /></div>
					<div class={style.layer} data-depth='0.25'><img src={'assets/yoga/images/lines.png'} /></div>
					<div class={style.layer} data-depth='0.45'><img src={'assets/yoga/images/slogan.png'} /></div>
					<div class={style.layer} data-depth='0.7'><img src={'assets/yoga/images/emblem.png'} /></div>	
				</div>
			</div>
		)
	}
}
