"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";

import { FormErrors } from "./form-errors";
import { Upload } from "lucide-react";
import { defaultImages } from "@/constants/images";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({
  id,
  errors,
}: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = (result.response as Array<Record<string, any>>);
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages([defaultImages]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div 
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input 
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash image"
              className="object-cover rounded-sm"
              fill  
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex items-center justify-center w-full h-full bg-black/30">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* <div
            role="button"
            className="flex flex-col items-center justify-center w-full h-full text-center transition rounded-sm aspect-video bg-muted gap-y-1 hover:opacity-75"
        >
            <Upload className="w-6 h-6" color="#5e5e5e" />
            <p className="text-xs text-stone-600">Upload Image</p>      
        </div> */}
        
      </div>
      <FormErrors
        id="image"
        errors={errors}
      />
    </div>
  );
};
