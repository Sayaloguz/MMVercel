import FormCrearJam from "@/common/components/Forms/FormCrearJam/Delivery";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import { ExperimentOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

export default function PageCrearJam() {
  return (
    <div className="text-center space-y-4 py-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h1 className="text-4xl font-bold flex justify-center items-center gap-2">
        <ExperimentOutlined className="shadowed relative -top-[2px] mr-2" />
        Nueva Jam
        <ExperimentOutlined className="shadowed relative -top-[2px] ml-2" />
      </h1>
      <p className="font-bold">
        Rellena los siguientes campos para crear una nueva Jam
      </p>
      <div className="min-h-screen flex items-center justify-center px-4 my-6">
        <div className="container max-w-3xl bg-slate-800/70 p-6 rounded-lg shadow-md  px-10 py-10">
          <ConfigProvider locale={esES}>
            <FormCrearJam />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
