import { h, Component } from 'preact';
import style from './style.less';

export default class Runner extends Component {
	state = {
		time: 0
	};

	updateTime = () => {
		let time = new Date().toLocaleString();
		this.setState({ time: this.state.time+1 });
	};

	startTime() {
		this.timer = setInterval(this.updateTime, 1000);
		this.setState({ time: 0 });
	}
	startTime() {
		this.setState({ time: 0 });
		clearInterval(this.timer);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render({ user }, { time }) {
		return (
			<div class={style.runner}>
				<h1>Are you ready?</h1>
				{time>0 ? (
					<div>
						<div>{time}</div>
						<a onClick={this.stopTime()}>stop</a>
					</div>
				) : (
					<a onClick={this.startTime()}>stop</a>
				)}
			</div>
		);
	}
}
