import localFont from "next/font/local";

export const roboto = localFont({
	src: [
		{
			path: "./Roboto-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./Roboto-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
});

export const pressStart2p = localFont({
	src: "./PressStart2P-Regular.woff2",
	weight: "400",
	style: "normal",
	display: "swap",
});

/*import { Comic_Neue, Press_Start_2P, Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const comicsans = Comic_Neue({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const pressStart2p = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

*/
