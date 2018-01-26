import { h, Component } from 'preact';
import style from './style.less';

export default class Runner extends Component {
	constructor(props) {
		super(props);
	};


	state = {
		time: 0,
		running: false
	};

	updateTime = () => {
		this.setState({ time: this.state.time+1 });
	};

	startTime() {
		let startTime = new Date().toLocaleString();
		this.timer = setInterval(this.updateTime, 100);
		this.setState({ time: 0, running: true, startTime: startTime, stopTime: null });
	};

	stopTime() {
		let stopTime = new Date().toLocaleString();
		this.setState({ stopTime: stopTime, running: false });
		clearInterval(this.timer);
	};

	componentWillUnmount() {
		clearInterval(this.timer);
	};

	render({ user }, { time }) {
		return (
			<div class={style.runner}>
				<h1>Are you ready?</h1>
				{this.state.stopTime ? (
					<div>started {this.state.startTime}, ended {this.state.stopTime}, ran for {this.state.time/10}sec</div>
				) : null }
				{this.state.running ? (
					<div>
						<div>{time/10}</div>
						<a onClick={this.stopTime.bind(this)}>stop</a>
					</div>
				) : (
					<a onClick={this.startTime.bind(this)}>start</a>
				)}
			</div>
		);
	}
}
