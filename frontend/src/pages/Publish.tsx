import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/AppBar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <AppBar />
        <div className="flex justify-center w-screen pt-8"> 
            <div className="flex flex-col justify-top mt-2">
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} 
                type="submit" className=" mr-3 items-center px-2.5 py-1 text-sm font-medium text-center text-white bg-blue-400 hover:bg-blue-600 rounded-full focus:ring-4 ">
                    +
                </button>
            </div>
            <div className="md:max-w-lg md:w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between ">
            <div className=" bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className=" block w-full  text-sm text-gray-800 bg-white border rounded-lg focus:ring-blue-500 focus:border-blue-500 pt-2.5 pl-2.5" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}