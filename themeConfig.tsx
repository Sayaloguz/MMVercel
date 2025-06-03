import { ThemeConfig } from "antd";

const themeConfig: ThemeConfig = {
	token: {
		colorPrimary: "#ef4444",
		borderRadius: 6,
		colorText: "#333",
		colorTextDescription: "var(--text-light)",
	},
	components: {
		Breadcrumb: {
			itemColor: "#ef4444",
			lastItemColor: "#333",
			separatorColor: "#333",
			linkHoverColor: "#ef4444",
			separatorMargin: 10,
		},
		Form: {
			fontSize: 15,
			labelColor: "var(--text-light)",
		},
		Card: {
			colorText: "#0A0A0A", // 👈 Aplica este color solo en Card
		},
		Menu: {
			itemBg: "var(--primary-dark)", // Fondo de los ítems
			itemColor: "var(--text-light)", // Texto normal
			itemHoverColor: "#ffffff", // Texto al pasar el ratón
			itemSelectedColor: "var(--accent)", // Texto seleccionado
			itemSelectedBg: "transparent", // Fondo del seleccionado
			horizontalItemHoverColor: "#ffffff", // Hover en menú horizontal
			horizontalItemSelectedColor: "var(--accent)",
			horizontalItemBorderRadius: 4,
			// No se usan colorItemText ni colorItemBg (deprecados)
		},
		Button: {
			defaultBg: "#181E2C", // Fondo base
			defaultColor: "#FFFFFF", // Texto normal
			defaultHoverBg: "#1F2737", // Fondo en hover
			defaultHoverColor: "#91caff", // 👈 Texto en hover (gris)
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
