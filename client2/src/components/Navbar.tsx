import React from "react";

export interface NavbarProps {
  search?: string;
  setSearch?: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ search = "", setSearch }) => {
  return (
    <nav className="bg-blue-600 shadow-md px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
      <h1 className="text-xl font-bold text-white text-center sm:text-left">
        MediConnect
      </h1>
      {setSearch && (
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-blue-500 focus:outline-2 focus:outline-solid border rounded px-3 py-1 w-full sm:w-64 md:w-72 lg:w-80"
        />
      )}
    </nav>
  );
};

export default Navbar;
