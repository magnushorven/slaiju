import { h, Component } from 'preact';
//import { Link } from 'preact-router';
import { Link } from 'preact-router/match';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Just do it!</h1>
				<nav>
					<Link activeClassName="active" href="/">Do it</Link>
					<Link activeClassName="active" href="/stats">Stats</Link>
				</nav>
			</header>
		);
	}
}
