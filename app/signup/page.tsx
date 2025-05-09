"use client"
import UserIcon from "@/public/icons/userIcon"
import { useState } from "react"
import toast from 'react-hot-toast'
import axios from "axios"
import { useRouter } from "next/navigation"

function Home (){
    const router = useRouter()
    const [password, setPassword] = useState<string>("")
    const [repassword, setRePassword] = useState<string>("")
    const [name, setName] = useState<string>("")

    const signUp = async () =>{
        if (password === "" || repassword === "" || name === ""){
            toast.error("Мэдээллээ бүрэн оруулна уу")
        } 
        else{
            if (password !== repassword){
                toast.error("Давтсан нууц үг таарахгүй байна")
            }
            else{
                try {
                    await axios.post("http://localhost:8080/api/users/signup", {
                      name: name,
                      password: password
                    });
                    toast.success("Амжилттай бүртгэлээ")
                    router.push("/login")
                  } catch (error) {
                    toast.error("Алдаа гарлаа та дахин оролдоно уу")
                  }    
            }
        }  
    }

    return <div className="flex justify-center items-center bg-gray-300 "> 
        <div className="flex flex-col justify-center items-center pt-[41px] gap-10 mb-[30px] mt-[20px] w-[500px] rounded-3xl border pb-[30px] shadow-2xl bg-white"> 
            <p className="font-bold text-xl"> Бүртгэлийн хуудас </p>    
            <div className="flex flex-col w-[350px]"> 
                <p className="mb-[15px]"> Username </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input  onChange={(e) => setName(e.target.value)} className="w-full" placeholder="нэрээ оруулна уу"/>
                </div>
                <div className="mt-[15px] w-full border mb-[34px] border-[#D9D9D9] "></div>
                <p className="mb-[15px]"> Password </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full" placeholder="нууц үг"/>
                </div>
                <div className="mt-[15px] w-full border border-[#D9D9D9] "></div>
                <p className="mb-[15px] mt-[15px]"> Re-password </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input type="password" onChange={(e) => setRePassword(e.target.value)} className="w-full" placeholder="нууц үгээ давтана уу"/>
                </div>
                <div className="mt-[15px] w-full border border-[#D9D9D9] "></div>
                <button onClick={signUp} className="mt-[25px] bg-gradient-to-r from-[#66D1DF] to-[#E63CFD] text-white py-[15px] mb-[35px] border rounded-4xl"> Бүртгүүлэх </button>
                
                <div className="flex justify-center mt-[100px] items-center">
                    <p> Бүртгэл байгаа юу? </p>
                    <button className="p-2 text-blue-400" onClick={() => router.push("/login")}> Нэвтрэх </button>
                </div>
            </div>
        </div>   
     </div>
}


export default Home 