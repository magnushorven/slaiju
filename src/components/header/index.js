import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Just do it!</h1>
				<nav>
					<Link href="/">Do it</Link>
					<Link href="/stats">Stats</Link>
				</nav>
			</header>
		);
	}
}
