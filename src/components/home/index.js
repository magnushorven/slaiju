import { h } from 'preact';
import style from './style.less';

export default () => {
	return (
		<div class={style.home}>
			<h1>Stats</h1>
			<p>Here be the world.</p>
		</div>
	);
};
