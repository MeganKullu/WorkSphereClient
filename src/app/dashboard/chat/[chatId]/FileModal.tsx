import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onUpload: () => void;
}

const FileModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onFileSelect,
  selectedFile,
  onUpload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
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
            <p>Selected File: {selectedFile.name}</p>
          </div>
        )}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 p-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white p-2 rounded" onClick={onUpload}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileModal;