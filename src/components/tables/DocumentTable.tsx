"use client";
import React, { useState } from "react";

const DocumentTable = () => {
  const [documents, setDocuments] = useState([
    {
      user_id: "123e4567-e89b-12d3-a456-426614174000",
      file_url: "http://example.com/file1.pdf",
      status: "pending",
      uploaded_at: "2023-10-01 10:00:00",
    },
    {
      user_id: "123e4567-e89b-12d3-a456-426614174001",
      file_url: "http://example.com/file2.pdf",
      status: "approved",
      uploaded_at: "2023-10-02 11:00:00",
    },
    {
      user_id: "123e4567-e89b-12d3-a456-426614174002",
      file_url: "http://example.com/file3.pdf",
      status: "rejected",
      uploaded_at: "2023-10-03 12:00:00",
    },
  ]);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedDocuments = documents.map((document, i) =>
      i === index ? { ...document, status: newStatus } : document
    );
    setDocuments(updatedDocuments);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              User ID
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              File URL
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Status
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">
              Uploaded At
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-gray-700">{document.user_id}</td>
              <td className="py-2 px-4 text-blue-500">
                <a
                  href={document.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.file_url}
                </a>
              </td>
              <td className="py-2 px-4">
                <select
                  value={document.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getStatusClass(
                    document.status
                  )}`}
                >
                  <option value="approved" className="text-green-500">
                    Approved
                  </option>
                  <option value="pending" className="text-yellow-500">
                    Pending
                  </option>
                  <option value="rejected" className="text-red-500">
                    Rejected
                  </option>
                </select>
              </td>
              <td className="py-2 px-4 text-gray-700">
                {document.uploaded_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
