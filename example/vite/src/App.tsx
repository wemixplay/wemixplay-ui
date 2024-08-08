import { useState } from 'react';
import viteLogo from '/vite.svg';

import './App.css';
import { SvgReact } from './assets/svgs';
import { FeedDetailEditor } from 'wemixplay-ui';

function App() {
	const [count, setCount] = useState(0);

	console.log('a')

	return (
		<>
		<FeedDetailEditor />
			<div>
				<a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank' rel='noreferrer'>
					<SvgReact />
				</a>
			</div>
			<h1>Vite + Reactasdas</h1>
			<div className='card'>
				<button onClick={() => {
					setCount(count => count + 1);
				}}>
          count is {count}
				</button>
				<p>
          Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
        Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
