import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

// Ensure these env vars are defined in your .env.local or similar
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Upload to Cloudinary
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET || "");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Нийтлэлээ бүрэн оруулна уу");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }
      // Send post data to your API
      await axios.post("/api/posts", { title, content, imageUrl });
      toast.success("Амжилттай нийтлэлээ");
      // Reset fields
      setTitle("");
      setContent("");
      setImageFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error(error);
      toast.error("Нийтлэл нийтлэх явцад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Нийтлэл оруулах</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Нийтлэл оруулах</DialogTitle>
          <DialogDescription>
            Та өөрийн дуртай зүйлээ олон нийтэд хуваалцана уу
          </DialogDescription>
        </DialogHeader>

        {/* Form Fields */}
        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Гарчиг
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Content */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Нийтлэл
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="col-span-3 w-full text-lg"
            />
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Зураг
            </Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
        </div>

        {/* Preview Section */}
        {previewUrl && (
          <div className="mt-2 max-h-40 overflow-auto border rounded p-1">
            <img
              src={previewUrl}
              alt="preview"
              className="w-full object-contain"
            />
          </div>
        )}

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Хүлээгдэж байна..." : "Нийтлэх"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
