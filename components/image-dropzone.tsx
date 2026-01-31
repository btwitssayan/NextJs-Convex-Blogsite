"use client";

import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  value?: File;
  onChange: (file?: File) => void;
  error?: boolean;
}

export function ImageDropzone({ value, onChange, error }: DropzoneProps) {
  const preview = value ? URL.createObjectURL(value) : null;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition",
        "hover:bg-muted/50 cursor-pointer",
        error ? "border-destructive" : "border-muted-foreground/25"
      )}
      onClick={() => document.getElementById("image-input")?.click()}
    >
      <input
        id="image-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0])}
      />

      {preview ? (
        <>
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={120}
            className="rounded-md object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
            }}
            className="absolute top-2 right-2 rounded-full bg-background p-1 shadow"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <>
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">
            Drag & drop an image or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG up to 5MB
          </p>
        </>
      )}
    </div>
  );
}
