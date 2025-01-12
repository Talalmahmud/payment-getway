"use client";
import React from "react";
import { signOut } from "@/app/actions";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      router.push("/");
      console.error("Logout success");
    }
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">My Application</div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
