import React, { useState } from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";
import { Search } from "lucide-react";

const CoverageArea = () => {
  const branches = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0); // ✅ used to trigger search manually

  // ✅ Trigger search manually when user clicks button or presses Enter
  const handleSearch = () => {
    setSearchTrigger((prev) => prev + 1);
  };

  // ✅ Also trigger search when user presses Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">
        We are available in 64 districts
      </h1>
      {/* ✅ Input with Button */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full pr-16" // ✅ increase right padding to fit button
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // live search works
          onKeyDown={handleKeyDown} // Enter works
        />

        {/* 🔍 Clickable button */}
        <button
          onClick={handleSearch}
          className="absolute right-1 top-1/2 -translate-y-1/2 btn btn-primary text-black btn-sm flex items-center gap-1"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      <CoverageMap
        branches={branches}
        searchTerm={searchTerm}
        searchTrigger={searchTrigger}
      />
    </div>
  );
};

export default CoverageArea;
