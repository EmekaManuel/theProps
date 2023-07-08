import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset=""
      options={{
        maxFiles: 1,
      }}
    >
        {({open}) => {
            return (
                <div className="relative cursor-pointer transition border-2 border-dashed hover;opacity-70" onClick={()=> open?.()}></div>
            )
        }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
