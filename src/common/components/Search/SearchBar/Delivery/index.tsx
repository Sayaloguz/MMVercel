"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

interface SearchJamProps {
  placeholder: string;
}

export default function SearchJam({ placeholder }: SearchJamProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    setSearchTerm(query); // Solo actualiza si cambia desde fuera (como al borrar el query)
  }, [query]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    handleSearch(val);
  };

  return (
    <div className="w-full max-w-md mx-auto my-2 min-h-[48px]">
      <div className="my-4">
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          allowClear
          size="large"
          prefix={<SearchOutlined />}
        />
      </div>
    </div>
  );
}
