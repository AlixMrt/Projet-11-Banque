import React from "react";
import Transaction from "./Transaction";

const transactionsArray = [
  {
    accountTitle: "Argent Bank Checking (x8349)",
    accountAmount: "2,082.79",
    accountStatus: "Available Balance",
  },
  {
    accountTitle: "Argent Bank Savings (x6712)",
    accountAmount: "$10,928.42",
    accountStatus: "Available Balance",
  },
  {
    accountTitle: "Argent Bank Credit Card (x8349)",
    accountAmount: "$184.30",
    accountStatus: "Current Balance",
  },
];

export default function Transactions() {
  return (
    <>
      <h2 className="sr-only">Accounts</h2>

      {transactionsArray.map((account, index) => {
        return (
          <Transaction
            accountTitle={account.accountTitle}
            accountAmount={account.accountAmount}
            accountStatus={account.accountStatus}
            key={account.accountAmount + index}
          />
        );
      })}
    </>
  );
}
