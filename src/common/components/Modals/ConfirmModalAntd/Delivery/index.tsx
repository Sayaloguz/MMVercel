import { Modal } from "antd";
import { FC } from "react";
import { ConfirmModalAntdProps } from "./interface";

// Componente de modal de confirmación personalizado utilizando Ant Design
const ConfirmModalAntd: FC<ConfirmModalAntdProps> = ({
  title,
  icon,
  message,
  open,
  onConfirm,
  onCancel,
  confirmLoading = false,
}) => {
  return (
    <Modal title={title} open={open} onCancel={onCancel} footer={null} centered>
      <div className="text-center">
        {icon}
        <p className="mb-4">{message}</p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onCancel}
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            disabled={confirmLoading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-[#ef4444] rounded-lg hover:bg-[#ef4444]/70 focus:ring-4 focus:outline-none focus:ring-red-300"
            disabled={confirmLoading}
          >
            {confirmLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Aceptar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModalAntd;
