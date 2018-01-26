import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Just do it!</h1>
				<nav>
					<Link href="/">Stats</Link>
					<Link href="/runner">Do it</Link>
				</nav>
			</header>
		);
	}
}
