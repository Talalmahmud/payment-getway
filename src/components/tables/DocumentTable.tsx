"use client";
import React, { useEffect, useState } from "react";
import {
  getDocuments,
  getUserRole,
  updateDocumentStatus,
  uploadFileToDocumentsBucket,
} from "@/app/actions"; // Adjust the import path as needed
import { format } from "date-fns";
import Pagination from "../common/Pagination";

const DocumentTable = () => {
  const [documents, setDocuments] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // You can adjust the number of items per page
  const [user, setUser] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [status, setStatus] = useState("All");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB in bytes
        setUploadError("File size should not exceed 5MB.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setUploadError(null);
      }
    }
  };

  const getRole = async () => {
    const user: any = await getUserRole();
    setUser(user);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    try {
      const fileUrl = await uploadFileToDocumentsBucket(file);
      getDocuments(status, page, itemsPerPage);
      setUploadError(null);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload file. Please try again.");
    }
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
  const handleStatusChange = (
    index: number,
    newStatus: string,
    pId: string
  ) => {
    console.log(pId);
    updateDocumentStatus(newStatus, pId);
    getDocuments(status, page, itemsPerPage);
  };
  const getDocumentsData = async () => {
    const data = await getDocuments(status, page, itemsPerPage);
    setDocuments(data);
    const totalDocuments = data?.length || 1; // Replace with actual total count from the response
    setItemsPerPage(Math.ceil(totalDocuments / itemsPerPage));
  };

  useEffect(() => {
    getDocumentsData();
  }, [status, page, itemsPerPage]);
  useEffect(() => {
    getDocumentsData();
    getRole();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className=" flex justify-between">
        <div className=" flex flex-col  gap-6 mb-4">
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="ml-2 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
          {uploadError && (
            <div className="text-red-500 text-sm mt-2">{uploadError}</div>
          )}
        </div>
        <div className="mb-4 flex items-center justify-end gap-4">
          <label htmlFor="statusFilter" className="text-gray-700 font-bold">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All</option>
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
        </div>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className=" text-[12px]">
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase  text-left">
              User ID
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase  text-left">
              File URL
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase  text-left">
              Status
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase  text-left">
              Uploaded At
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document: any, index: any) => (
            <tr key={index} className="border-b text-[12px]">
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
              <td className="py-2 px-4 inline-block">
                {user?.role === "user" ? (
                  document.status
                ) : (
                  <select
                    value={document.status}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value, document?.id)
                    }
                    className={`shadow appearance-none border inline-block rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getStatusClass(
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
                )}
              </td>
              <td className="py-2 px-4 text-gray-700">
                {format(document.uploaded_at, "yyyy-MM-dd,HH-mm-ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {itemsPerPage > 10 && (
        <Pagination
          currentPage={page}
          totalPages={itemsPerPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default DocumentTable;
