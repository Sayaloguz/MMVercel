export interface ConfirmModalAntdProps {
	title: string;
	icon: React.ReactNode;
	message: string;
	open: boolean;
	onConfirm: () => void | Promise<void>;
	onCancel: () => void;
	confirmLoading?: boolean;
}
