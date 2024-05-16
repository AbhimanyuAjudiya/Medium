import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({blog} : {blog : Blog}) => {
  return (
    <div className="grid md:grid-cols-12 p-5">
      <div className="col-span-9 p-3">
        <div className=" text-2xl font-extrabold">
            {blog.title}
        </div>
        <div className=" text-sm font-light">
            Posted on Jan 24, 2024
        </div>
        <div>
            {blog.content}
        </div>
      </div>
      <div>
        <div className="text-sm">Author</div>
        <div className="flex justify-normal">
            <div className="flex justify-center flex-col pr-2">
                <Avatar name={blog.author.name || "Anonymous"}/>
            </div>
            <div className="text-lg font-semibold">
                {blog.author.name || "Anonymous"}
            </div>
        </div>
      </div>
    </div>
  );
};
