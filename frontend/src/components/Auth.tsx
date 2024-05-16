import { SignupInput } from "@abhimanyu_ajudiya/medium-common-validation";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

interface LabelledInputType {
    label: string;
    placeholder : string;
    type: string;
    onChange: (e: ChangeEvent) => void;
}

export const Auth = ({type} : {type : "signin" | "signup"}) => {

    const n = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    async function sendReq(){
            // const res = await axios.post(`${BACKEND_URL}/api/v1/user${type == "signup" ? "/signup" : "/signin"}` , postInputs);
            // const {jwt} = res.data;
            // localStorage.setItem("token",jwt);
            await axios.post(`${BACKEND_URL}/api/v1/user${type == "signup" ? "/signup" : "/signin"}` , postInputs)
            .then((res) => {
                localStorage.setItem("token",res.data);
                n("/blogs")
            })
            .catch( (e) => {
            console.log(e);
            alert("error")
        })
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-8">
                <div className="px-8 m-5">
                    <div className="text-5xl font-extrabold">
                    {type == "signin" ? "Sign in to your account" : "Create your account"}
                    </div>
                    <div className=" text-slate-400">
                       {type == "signup" ? "Already have an account?" : "Create your account"}
                        <Link className="pl-2 underline" to={type == "signin" ?"/signup" : "/signin"}>
                            {type == "signin" ? "Signup" : "Signin"}
                        </Link>
                    </div>
                </div>
                <div>
                    {type == "signup" ? <LabelledInput label="Name" type="text" placeholder="Abhimanyu Ajudiya" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: (e.target as HTMLInputElement).value
                        })
                    }}/> : null}
                    <LabelledInput label="Email" type="email" placeholder="abhimanyuajudiya@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: (e.target as HTMLInputElement).value
                        })
                    }}/>
                    <LabelledInput label="Password" type="password" placeholder="password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: (e.target as HTMLInputElement).value
                        })
                    }}/>
                    <button type="button" onClick={sendReq} className="mt-8 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">{type == "signin" ? "Signin" : "Signup"}</button>
                </div>
            </div>
        </div>
    </div>
}

const LabelledInput = ({label, placeholder, type, onChange} : LabelledInputType) => {
    return <div>
        <div>
            <label className="block mb-2 text-lx text font-semibold text-gray-900 dark:text-black">{label}</label>
            <input  onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    </div>
}