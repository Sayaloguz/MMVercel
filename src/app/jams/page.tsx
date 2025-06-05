import { GlobalOutlined } from "@ant-design/icons";
import JamsResults from "@/common/components/Pages/JamsResults/Delivery";
import { Suspense } from "react";

export default function JamsPage() {
  return (
    <div className="text-center space-y-4 py-4">
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
