import NavBar from "@/common/components/NavigationElements/NavBar/NavBar";
import "./globals.css";
import Footer from "@/common/components/Footer/Footer";
import { ConfigProvider } from "antd";
import themeConfig from "../../themeConfig";
import { roboto } from "./fonts/fonts";

export const metadata = {
	title: "Matchmaker",
	description: "Organiza y participa en jams fácilmente",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body
				className={`${roboto.className} antialiased layout flex flex-col min-h-screen`}
			>
				<ConfigProvider theme={themeConfig}>
					<NavBar />
					{children}
					<Footer />
				</ConfigProvider>
			</body>
		</html>
	);
}
