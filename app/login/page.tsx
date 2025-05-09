"use client"
import UserIcon from "@/public/icons/userIcon"
import FacebookIcon from "@/public/icons/facebookIcon"
import InstagramIcon from "@/public/icons/instagramIcon"
import TwitterIcon from "@/public/icons/twitterIcon"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

function Home (){

    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const signIn =async () =>
    {
        if (name == "" || password == "")
        {
            toast.error("Мэдээллээ бүрэн оруулна уу")
        }
        else{
            const response =await axios.post("http://localhost:8080/api/users/login", {
                name : name,
                password : password
            })
            if (!response)
            {
                toast.error("Та нэвтрэх нэр болон нууц үгээ дахин шалгана уу")
            }
            else
            {
                console.log(response)
                localStorage.setItem("token", response.data.username);
                toast.success("Амжилттай нэвтэрлээ")
                router.push("/")
            }
        }
    }


    return <div className="flex justify-center items-center bg-gray-300"> 
        <div className="flex flex-col justify-center items-center mt-[20px] mb-[30px] pt-[41px] gap-10 w-[500px] rounded-3xl border pb-[30px] shadow-2xl bg-white"> 
            <p className="font-bold text-xl"> Нэвтрэх </p>    
            <div className="flex flex-col w-[350px]"> 
                <p className="mb-[15px]"> Username </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input onChange={(e) => setName(e.target.value)} className="w-full" placeholder="Хэрэглэгчийн нэрээ оруулна уу"/>
                </div>
                <div className="mt-[15px] w-full border mb-[34px] border-[#D9D9D9] "></div>
                <p className="mb-[15px]"> Password </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full" placeholder="Хэрэглэгчийн нууц үг"/>
                </div>
                <div className="mt-[15px] w-full border border-[#D9D9D9] "></div>
                <div className="flex justify-end mb-[35px]">
                    <button className="flex justify-end mt-1 p-2 w-fit bg-gray-50"> нууц үгээ өөрчлөх </button>
                </div>
                <button onClick={signIn} className="bg-gradient-to-r from-[#66D1DF] to-[#E63CFD] text-white py-[15px] mb-[35px] border rounded-4xl"> Нэвтрэх </button>
                <div className="flex justify-center items-center flex-col gap-[10px]">
                    <p> Эсвэл доорхоор нэвтрэх </p>
                    <div className="flex gap-[7px]">
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <InstagramIcon/>
                    </div>
                </div>
                <div className="flex justify-center mt-[70px] items-center">
                    <p> Бүртгэл байхгүй юу? </p>
                    <button className="p-2 text-blue-400" onClick={() => router.push("/signup")}> Бүртгүүлэх </button>
                </div>
            </div>
        </div>   
     </div>
}


export default Home 