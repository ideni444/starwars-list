import React from 'react';
import Head from 'next/head';
const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="description"
					content="An open source directory of every country in the world, searchable by name or languages spoken."
				/>

				<meta property="og:title" content="Country Search" />
				<meta property="og:type" content="web application" />
				<meta property="og:description" content="An open source country directory." />
				<meta property="og:image" content="https://i.postimg.cc/VNhy7qp7/Country-Search-Image.png" />
				<meta property="og:url" content="https://next-country-search.vercel.app/" />
				<meta name="twitter:card" content="summary_large_image"></meta>
				<title>Heroes Search</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<main>{children}</main>
		</>
	);
};

export default Layout;
1