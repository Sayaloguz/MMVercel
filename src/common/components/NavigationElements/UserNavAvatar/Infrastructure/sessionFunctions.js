import { message } from "antd";
const logout = async () => {
	try {
		const res = await fetch("http://localhost:8080/auth/logout", {
			method: "GET",
			credentials: "include",
		});
		if (res.ok) {
			message.success("Sesión cerrada");
			window.location.reload();
		} else {
			message.error("Error cerrando sesión");
		}
	} catch (error) {
		message.error("Error de red al cerrar sesión. " + error);
	}
};

export default logout;
