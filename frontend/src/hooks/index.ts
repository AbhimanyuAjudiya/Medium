import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "title": string;
    "content": string;
    "id": number;
    "author": {
        "name": string;
    }
}

export const useBlog = ({id} : {id : number}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>({
        "title": "",
        "content": "",
        "id": 1,
        "author": {
            "name": ""
        }
    });

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then( res => {
            setBlog(res.data.blog);
            setLoading(false);
        })
        .catch(e => {
            console.log(e);
        })
    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then( res => {
            setBlogs(res.data.blogs);
            setLoading(false);
        })
        .catch(e => {
            console.log(e);
        })
    },[])

    return {
        loading,
        blogs
    }
}