import { message } from "antd";
import { API_URL } from "@/common/utils/config";

const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
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
