// components/admin/AdminTable.tsx
"use client";

import React from "react";

interface Applicant {
  name: string;
  program: string;
  status: "Pending" | "Accepted" | "Rejected"; // <-- union type
}


interface AdminTableProps {
  applicants: Applicant[];
}

const AdminTable: React.FC<AdminTableProps> = ({ applicants }) => {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-lg overflow-hidden border border-border-light dark:border-border-dark">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background-light dark:bg-background-dark">
            <tr>
              <th className="p-4.5 font-semibold text-sm text-muted-light dark:text-muted-dark tracking-wider">Applicant Name</th>
              <th className="p-4.5 font-semibold text-sm text-muted-light dark:text-muted-dark tracking-wider">Program</th>
              <th className="p-4.5 font-semibold text-sm text-muted-light dark:text-muted-dark tracking-wider">Status</th>
              <th className="p-4.5 font-semibold text-sm text-muted-light dark:text-muted-dark tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {applicants.map((applicant, idx) => (
              <tr key={idx}>
                <td className="p-4.5 whitespace-nowrap text-foreground-light dark:text-foreground-dark font-medium">{applicant.name}</td>
                <td className="p-4.5 whitespace-nowrap text-muted-light dark:text-muted-dark">{applicant.program}</td>
                <td className="p-4.5 whitespace-nowrap">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    applicant.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : applicant.status === "Accepted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="p-4.5 whitespace-nowrap text-right space-x-2">
                  {applicant.status === "Pending" ? (
                    <>
                      <button className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600">Approve</button>
                      <button className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">Reject</button>
                    </>
                  ) : (
                    <button className="px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 dark:text-white dark:bg-primary/30 dark:hover:bg-primary/40">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
