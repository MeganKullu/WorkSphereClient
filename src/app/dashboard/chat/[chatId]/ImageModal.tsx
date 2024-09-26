import React from "react";
import { HiOutlineX } from "react-icons/hi";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 lg:h-3/4 xl:h-1/2 lg:w-1/3 xl:w-1/4">
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          <HiOutlineX />
        </button>
        <img src={imageUrl} alt="Expanded view" className="max-w-full max-h-full rounded-lg border-white" />
      </div>
    </div>
  );
};

export default ImageModal;