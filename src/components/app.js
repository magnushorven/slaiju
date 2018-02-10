import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Stats from './stats';
import Admin from './admin';
import Runner from './runner';

export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Runner path="/" />
					<Stats path="/stats/" />
					<Admin path="/admin/" />
				</Router>
			</div>
		);
	}
}
