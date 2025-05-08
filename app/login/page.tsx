import UserIcon from "@/public/icons/userIcon"
import FacebookIcon from "@/public/icons/facebookIcon"
import InstagramIcon from "@/public/icons/instagramIcon"
import TwitterIcon from "@/public/icons/twitterIcon"

function Home (){


    return <div className="flex justify-center items-center"> 
        <div className="flex flex-col justify-center items-center mt-[41px] gap-10 w-[500px]"> 
            <p className="font-bold text-xl"> Login </p>    
            <div className="flex flex-col w-[350px]"> 
                <p className="mb-[15px]"> Username </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input className="w-full" placeholder="Хэрэглэгчийн нэрээ оруулна уу"/>
                </div>
                <div className="mt-[15px] w-full border mb-[34px] border-[#D9D9D9] "></div>
                <p className="mb-[15px]"> Password </p>
                <div className="flex gap-2">
                    <UserIcon/>
                    <input className="w-full" placeholder="Хэрэглэгчийн нууц үг"/>
                </div>
                <div className="mt-[15px] w-full border border-[#D9D9D9] "></div>
                <div className="flex justify-end mb-[35px]">
                    <button className="flex justify-end mt-1 p-2 w-fit bg-gray-50"> нууц үгээ өөрчлөх </button>
                </div>
                <button className="bg-gradient-to-r from-[#66D1DF] to-[#E63CFD] text-white py-[15px] mb-[35px] border rounded-4xl"> Нэвтрэх </button>
                <div className="flex justify-center items-center flex-col gap-[10px]">
                    <p> Эсвэл доорхоор нэвтрэх </p>
                    <div className="flex gap-[7px]">
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <InstagramIcon/>
                    </div>
                </div>
                <div className="flex justify-center mt-[100px]">
                    <button> Бүртгүүлэх </button>
                </div>
            </div>
        </div>   
     </div>
}


export default Home 