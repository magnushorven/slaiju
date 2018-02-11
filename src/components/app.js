import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';

import Header from './header';
import Stats from './stats';
import Admin from './admin';
import Runner from './runner';

export default class App extends Component {
/*	onst Main = () => (

	);*/
/*	handleRoute = e => {
		this.currentUrl = e.url;
	};*/

/* 	<Router onChange={this.handleRoute}>
 </Router>*/
	render() {
		return (
			<div id="app">
				<Header />
				<Router history={createHashHistory()}>
					<Runner path="/" />
					<Stats path="/stats/" />
					<Admin path="/admin/" />
				</Router>
			</div>
		);
	}
}
