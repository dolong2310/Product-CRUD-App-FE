import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  src?: string;
  onChange?: (file: File) => void;
  onRemove?: () => void;
};

const UploadImage = ({ src, onChange, onRemove }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onRemove && onRemove();
  };

  return (
    <>
      <div className="w-full max-w-2xl h-96 border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
        {(imageFile || src) && (
          <>
            <Image
              src={imageFile ? URL.createObjectURL(imageFile) : src!}
              alt="Preview Image"
              fill
              className="object-cover rounded-lg"
            />
            <Button
              className="absolute top-2 right-2"
              type="button"
              variant={"destructive"}
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
          </>
        )}
      </div>

      <Input
        ref={inputRef}
        id="product-image-input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageFile(file);
            onChange && onChange(file);
          }
        }}
      />
    </>
  );
};

export default UploadImage;
