"use client";

import GeneralJamList from "@/common/components/Cards/GeneralJamCard/GeneralJamsList/Delivery";
import SearchJam from "@/common/components/Search/SearchBar/Delivery";

export default function JamsResults() {
  return (
    <div className="text-center space-y-4 py-1 mx-6">
      <SearchJam placeholder="Buscar Jam por título de la Jam" />
      <GeneralJamList />
    </div>
  );
}
