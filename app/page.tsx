"use client"
import { Post } from "@/components/post"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PostDisplay } from "@/components/showPost"
import { FaUserFriends } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { HiUserGroup } from "react-icons/hi2";
import { FaPlaceOfWorship } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaSourcetree } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation"

type Post = {
  id : string,
  title : string, 
  content : string,
  imageUrl : string,
  username : string,
  createdAt? : string,
  likeCount : number,
}

type User = {
  username : string,
  password : string,
}


const Home = () =>{
  const router = useRouter()
  
  const [name, setName] = useState<string>("")
  const [posts , setPosts] = useState<Post[]>([])
  const [users , setUsers] = useState<User[]>([])
  const [posted, setPosted] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Нэвтэрч ор")
      router.push("/login")
    }
    setName(token || "")
  }, [])
  useEffect(() => {
    const fetchPost =async () =>{
      const response =await axios.get("http://localhost:8080/api/posts")
      if(!response){
        toast.error("Нийтлэлүүдийг ачаалахад алдаа гарлаа")
      }
      else{
        console.log(response)
        setPosts(response.data)
      }
    }
    fetchPost()
  },[posted])
  useEffect(()=>{
     const fetchUser =async () =>{
      const response =await axios.get("http://localhost:8080/api/users")
      if(!response){
        toast.error("Хэрэглэгчийн мэдээллийг ачаалахад алдаа гарлаа")
      }
      else{
        setUsers(response.data)
      }
    }
    fetchUser()
  }
    ,[])


  return <div className="flex justify-center bg-[#F2F4F7] h-screen overflow-hidden">
      <div className="flex flex-col w-[300px] pt-[50px] gap-[30px] ml-[12px] mr-[100px]">
        <div className="flex ml-[-12px]"> 
          <img className="w-[45px]" src={"https://maketuwetlands.org.nz/wp-content/uploads/2023/03/Facebook-logo.png"}/>   
          <p> {name} </p>
        </div>
        <div className="flex items-center gap-3 ">
          <FaUserFriends color="blue" size={25}/>
          <p> Найзууд </p>
        </div>
        <div className="flex items-center gap-3">
          <CiSaveDown2 color="blue" size={25} />
          <p> Хадгалсан </p>
        </div>
        <div className="flex items-center gap-3">
          <CiClock1  color="blue" size={25} />
          <p> Дурсамж </p>
        </div>
        <div className="flex items-center gap-3">
          <HiUserGroup color="blue" size={25} />
          <p> Бүлгүүд </p>
        </div>
        <div className="flex items-center gap-3">
          <MdOutlineOndemandVideo color="blue" size={25} />
          <p> Видео </p>
        </div>  
        <div className="flex items-center gap-3">
          <FaPlaceOfWorship  color="blue" size={25} />
          <p> MarketPlace </p>
        </div> 
        <div className="flex items-center gap-3">
          <FaSourcetree   color="blue" size={25} />
          <p> Эх сурвалж </p>
        </div> 
        <div className="w-full border border-gray-300"> </div>
        <p> Таны хамааралтай бүлгүүд </p>
        <div className="flex items-center gap-3"> 
          <img className="w-[60px] h-[30px]" src={"https://scontent.fuln5-1.fna.fbcdn.net/v/t39.30808-6/399156865_6643496499020441_6227941830696686788_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2285d6&_nc_ohc=p96LABk5N7kQ7kNvwG8VtQl&_nc_oc=AdnXpeMFqwZIqL7tgC7Kb98ijWGmJkr6hRd7uqJy_J8NH60PcOrjOxPINliypM37WDs&_nc_zt=23&_nc_ht=scontent.fuln5-1.fna&_nc_gid=mAm3W3Uwe8S4myMl8pulUQ&oh=00_AfJHZ2kshp_TYz6B2xNQY6_mAKm__u7VdZxvrb-3iQzguA&oe=68222C52"}/>
          <p> ШУТИС МХТС </p>
        </div>
        <div className="flex items-center gap-3"> 
          <img className="w-[60px] h-[30px]" src={"https://scontent.fuln5-1.fna.fbcdn.net/v/t39.30808-6/492743786_9877867445626354_1239182165110112612_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=2285d6&_nc_ohc=cs1aWMmh5JkQ7kNvwFNwch2&_nc_oc=AdmytCCWCZgrmefMhOBTuLlWf_E_I5ieEEZZZrCbQsD0yqxTV-PUiq2Ener7e7w_Qvs&_nc_zt=23&_nc_ht=scontent.fuln5-1.fna&_nc_gid=G2lqPFA07UtKH3AXbx6L1w&oh=00_AfJt36u9NDaWjEg0rYq0GnkVwADQVP8si79L5qzqI7A6PA&oe=682247EA"}/>
          <p> IT engineer (Айти инженер) </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-white w-[700px] h-full overflow-y-auto px-4">
        <div>
          <p className="text-2xl font-bold text-center pt-[30px]"> Нийтлэлүүд </p>
          <div className="w-full border border-[#D9D9D9] mt-[20px] mb-[30px]"></div>
        </div>
        {posts.map((post, index) => (
          <PostDisplay
            id={post.id}
            key={index}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            date={post.createdAt}
            username={post.username}
            likeCount={post.likeCount}
          />
        ))}
      </div>
      <div className="flex flex-col ml-[50px] pt-[50px] w-[300px] h-full overflow-y-auto"> 
        <div className="flex flex-col items-start justify-start gap-3">
          <div className="flex gap-4"> 
          <Post onPostCreated={() => setPosted(!posted)} />  
            <button
              onClick={() => {
                localStorage.removeItem("token")
                router.push("/login")
              }}
              className="bg-white rounded-2xl px-4 py-2 hover:bg-gray-200 transition"
            >
              Гарах
            </button> 
          </div>
        
          <p className="text-gray text-xl mb-[20px]"> Ивээн тэтгэсэн </p>
          <div className="flex flex-col gap-2 "> 
            <img className="w-[300px] h-[150px]" src={"https://prosettings.net/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=pad%2Ch=675%2Cq=85%2Csharpen=2%2Cw=1200/wp-content/uploads/the-mongolz.png"}/>  
            <p> A man can be destroyed but not defeated. </p>
          </div>
          <div className="w-full border border-gray-300 mb-[30px]"> </div>
          <div className="flex flex-col gap-2 "> 
            <img className="w-[300px] h-[150px]" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Tt0vYk-TO5NddCtzLbF5HscZEeBW72TU6Q&s"}/>  
            <p> Real Magic. </p>
          </div>
          <div className="w-full border border-gray-300 mb-[30px]"> </div>
          <p className="text-gray text-xl mb-[20px]"> Харилцагчид </p>
          <div className="flex flex-col gap-2 ">
            {users.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex gap-3 items-center justify-center">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-300">
                    <CiUser size={25} />
                  </div>
                  <p className="text-gray text-xl flex items-center"> {user.username} </p>
                </div>                
              </div>
            ))}
          </div>

        </div>        
      </div>
      
  </div> 
}

export default Home