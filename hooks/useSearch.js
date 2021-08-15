import { useRouter } from "next/router";
import { useState } from "react";

export default function useSearch(pathname) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSearch = e => {
    e.preventDefault();
    if (!query.length) return;
    router.push({ pathname, query: { query } });
  };

  return {
    handleSearch,
    query,
    setQuery,
  };
}
