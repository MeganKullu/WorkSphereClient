import React from "react";
import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onUpload: () => void;
  isFileUploading: boolean;
}

const FileModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onFileSelect,
  selectedFile,
  onUpload,
  isFileUploading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/4">
        <div className="flex justify-end">
          <button className="ml-auto" onClick={onClose}>
            <HiOutlineX className="size-6 text-black" />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Attach a Document or Image</h2>
        <div className="flex gap-4 mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileSelect(e.target.files[0]);
                }
              }}
            />
            <div className="bg-gray-200 p-2 rounded">Attach Image</div>
          </label>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onFileSelect(e.target.files[0]);
                }
              }}
            />
            <div className="bg-gray-200 p-2 rounded">Attach Document</div>
          </label>
        </div>
        {selectedFile && (
          <div className="mb-4 text-black">
            <p className="text-xs text-[#6e89c2] truncate">
              Selected File: {selectedFile.name}
            </p>
          </div>
        )}
        <div className="flex w-full gap-4">
          <button
            className="bg-[#395290] text-white rounded-full w-full text-sm font-semibold px-5 py-2 justify-center items-center"
            onClick={onUpload}
            disabled={isFileUploading}
          >
            {isFileUploading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileModal;