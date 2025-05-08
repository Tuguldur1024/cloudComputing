"use client"
import { Post } from "@/components/post"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Post = {
  title : string, 
  content : string,
  imageUrl : string
}

const Home = () =>{
  const [posts , setPosts] = useState<Post[]>([])

  useEffect(()=>{
      const response = axios.get("localhost:8080/api/posts")
      if(!response){
        toast.error("Нийтлэлүүдийг ачаалахад алдаа гарлаа")
      }
      else{

      }
    },
  [])


  return <div>
      <Post/>
  </div> 
}

export default Home