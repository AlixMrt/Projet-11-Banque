import React from "react";
import Transactions from "../components/Transactions";
import EditUser from "../components/EditUser";

export default function UserPage() {
  return (
    <main className="main user">
      <EditUser />
      <Transactions />
    </main>
  );
}
