import { h, Component } from 'preact';
//import { Link } from 'preact-router';
import { Link } from 'preact-router/match';
import style from './style.less';

export default class Header extends Component {
	render() {
		let profileStyle = localStorage.getItem('name') ? style.active : style.inactive
		//{localStorage.getItem('name') ? localStorage.getItem('name') : 'login'}
		return (
			<header class={style.header}>
				<h1>Just do it!</h1>
				<nav>
					<Link activeClassName="active" href="/">Do it</Link>
					<Link activeClassName="active" href="/stats">Stats</Link>
					<Link activeClassName="active" href="/profile">
						<img class={style.avatar} src='assets/icons/avatar.png' />
					</Link>
				</nav>
			</header>
		);
	}
}
