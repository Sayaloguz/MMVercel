import HistoryJamList from "@/common/components/Cards/HistoryJamCard/HistoryJamList/Delivery";
import { HourglassOutlined } from "@ant-design/icons";

export default function HistorialPage() {
  return (
    <>
      <div className="text-center space-y-4 py-4">
        <h1 className="md:text-4xl text-3xl font-bold flex justify-center items-center gap-2">
          <HourglassOutlined className="shadowed relative -top-[2px] mr-2" />
          Historial de Jams
          <HourglassOutlined className="shadowed relative -top-[2px] ml-2" />
        </h1>
        <p className="font-bold">
          Estas son las Jams en las que has participado
        </p>
      </div>
      <HistoryJamList />
    </>
  );
}
