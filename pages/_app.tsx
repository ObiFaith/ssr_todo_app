import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Josefin_Sans } from 'next/font/google';
import useTheme, { ThemeProvider } from '@/store/useTheme';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';

const josefinSans = Josefin_Sans({
	weight: ['400', '700'],
	subsets: ['latin'],
});

const RootLayout = ({ Component, pageProps, router }: AppProps) => {
	const { isDarkMode } = useTheme();
	return (
		<main
			className={`relative antialiased min-h-screen scroll-smooth transition-all ${
				josefinSans.className
			} ${isDarkMode ? 'bg-dark-blue-100' : 'bg-white'}`}
		>
			<Component {...pageProps} router={router} />
		</main>
	);
};

const App = ({ Component, pageProps, router }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(pageProps);
	return (
		<ThemeProvider>
			<Provider store={store}>
				<RootLayout
					Component={Component}
					pageProps={props.pageProps}
					router={router}
				/>
			</Provider>
		</ThemeProvider>
	);
};

export default wrapper.withRedux(App);
