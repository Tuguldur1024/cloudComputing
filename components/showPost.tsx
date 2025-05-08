import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";

export interface PostDisplayProps {
  title: string;
  content: string;
  imageUrl?: string;
  date?: string;
}

export function PostDisplay({ title, content, imageUrl, date }: PostDisplayProps) {
  return (
    <Card className="max-w-md w-full mx-auto my-4">
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {date && (
            <span className="text-sm text-muted-foreground">
              {format(new Date(date), "PPP p")}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap mb-4">{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-lg object-cover"
          />
        )}
      </CardContent>
      <CardFooter>
        {/* You can add actions here, e.g. like/comment buttons */}
      </CardFooter>
    </Card>
  );
}

// Example usage in parent component:
// import { PostDisplay } from "./PostDisplay";
//
// const samplePost = {
//   title: "My First Post",
//   content: "This is the content of my post...",
//   imageUrl: "https://res.cloudinary.com/your-cloud/image/upload/v123456/sample.jpg",
//   date: new Date().toISOString(),
// };
//
// export default function PostsPage() {
//   return (
//     <div className="p-4">
//       <PostDisplay {...samplePost} />
//     </div>
//   );
// }