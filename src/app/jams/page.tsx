import { GlobalOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import JamsResults from "@/common/components/Pages/JamsResults/Delivery";
import { Suspense } from "react";

export default function JamsPage() {
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
        <GlobalOutlined className="shadowed relative -top-[2px] mr-2" />
        Jams
        <GlobalOutlined className="shadowed relative -top-[2px] ml-2" />
      </h1>
      <p className="font-bold">Lista de Jams disponibles</p>
      <Suspense>
        <JamsResults />
      </Suspense>
    </div>
  );
}
