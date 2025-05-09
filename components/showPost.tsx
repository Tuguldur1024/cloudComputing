import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import axios from "axios";

export interface PostDisplayProps {
  id : string;
  title: string;
  content: string;
  imageUrl?: string;
  date?: string;
  username?: string;
  likeCount?: number;
}

export function PostDisplay({
  id,
  title,
  content,
  imageUrl,
  date,
  username,
  likeCount = 0,
}: PostDisplayProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount1, setLikeCount] = useState(likeCount || 0); 


  const handleLikeToggle = () => {
    if(liked){
      axios.post("http://localhost:8080/api/posts/like", { id , liked : false })
    }
    else{
      axios.post("http://localhost:8080/api/posts/like", { id , liked : true })
    }
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Card className="max-w-md w-full mx-auto my-4 shadow-2xl">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-2">
            {username && <span>by @{username}</span>}
            {date && <span>{format(new Date(date), "PPP p")}</span>}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="whitespace-pre-wrap mb-4">{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-lg h-[350px] object-cover"
          />
        )}
      </CardContent>

      {/* Facebook-style Like Summary */}
      <div className="flex items-center justify-between px-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="bg-white rounded-full p-[2px] text-blue-500 shadow-sm">
              <FaThumbsUp size={12} />
            </div>
            <div className="bg-white rounded-full p-[2px] text-red-500 shadow-sm">
              <FaHeart size={12} />
            </div>
          </div>
          <span>{likeCount1.toLocaleString()} Таалагдсан</span>
        </div>
        {/* You can optionally add comments or shares here */}
      </div>

      <div className="w-full border-t border-gray-300 mt-2 mb-1"></div>

      {/* Like Button Section */}
      <CardFooter>
        <button
          onClick={handleLikeToggle}
          className={`flex items-center justify-center w-full gap-2 py-2 rounded hover:bg-gray-100 transition ${
            liked ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          <FaThumbsUp />
          <span>Таалагдлаа</span>
        </button>
      </CardFooter>
    </Card>
  );
}
