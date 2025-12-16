"use client";

import { useRef, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function TaskSearch() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");

    if (term.trim()) params.set("q", term);
    else params.delete("q");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      fullWidth
      ref={ref}
      autoFocus
      type="search"
      variant="outlined"
      placeholder="Search"
      sx={{ marginTop: 4, marginBottom: 2 }}
      defaultValue={searchParams.get("q") || ""}
      onChange={(e) => handleSearch(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
