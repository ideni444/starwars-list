import Layout from '../Components/Layout';
import '../styles/main.scss';
import React from 'react';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;