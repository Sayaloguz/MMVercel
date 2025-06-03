import HistoryJamList from "@/common/components/Cards/HistoryJamCard/HistoryJamList/Delivery";

export default function PruebasPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-6">
      <div className="container max-w-3xl bg-slate-800/70 p-10 rounded-lg shadow-md">
        <HistoryJamList />
      </div>
    </div>
  );
}
