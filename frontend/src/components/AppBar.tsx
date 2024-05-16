import { Link } from "react-router-dom"

export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            Medium
        </Link>
        <div className="flex flex-row">
            <Link to={"/publish"} className="pl-5">
                <button type="button" className="flex flex-col justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">New</button>
            </Link>
        </div>
    </div>
}