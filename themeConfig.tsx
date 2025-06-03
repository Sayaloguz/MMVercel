import { ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#ef4444",
    borderRadius: 6,
    colorText: "#333",
    colorTextDescription: "var(--text-light)",
  },
  components: {
    Form: {
      fontSize: 15,
      labelColor: "var(--text-light)",
    },
    Card: {
      colorText: "#0A0A0A",
    },
    Menu: {
      itemBg: "var(--primary-dark)",
      itemColor: "var(--text-light)",
      itemHoverColor: "#ffffff",
      itemSelectedColor: "var(--accent)",
      itemSelectedBg: "transparent",
      horizontalItemHoverColor: "#ffffff",
      horizontalItemSelectedColor: "var(--accent)",
      horizontalItemBorderRadius: 4,
    },
    Button: {
      defaultBg: "#181E2C",
      defaultColor: "#FFFFFF",
      defaultHoverBg: "#1F2737",
      defaultHoverColor: "#91caff",
      defaultBorderColor: "#181E2C",
    },
  },
};

export default themeConfig;
/*
  components: {
    Button: {
      colorPrimary: "#1890ff",
      algorithm: true, // Habilita sobreescritura para este componente
    } /*
    Input: {
      colorPrimary: "#1890ff",
      activeBorderColor: "#1890ff",
      hoverBorderColor: "#40a9ff",
    },
    Table: {
      headerBg: "#fafafa",
      headerColor: "#333",
    },
  },*/
