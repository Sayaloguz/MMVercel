"use client";
import { FC } from "react";
import Image from "next/image";

const LoginButton: FC = () => {
	const handleLogin = () => {
		window.location.href = "http://localhost:8080/auth/steam/login";
	};

	return (
		<button onClick={handleLogin} style={{ cursor: "pointer" }}>
			<Image
				src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
				alt="Login con Steam"
				width={180}
				height={180}
			/>
		</button>
	);
};

export default LoginButton;
