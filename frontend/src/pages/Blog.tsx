import { useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blog() {
  const { id } = useParams();
  const {loading, blog} = useBlog({
    id: Number(id) || 1
  });
    if(loading){
      return <div>
        <AppBar />
        <BlogSkeleton />
      </div>
    }

    return (<div>
        <div>
          <AppBar />
        </div>
        <div>
          <FullBlog blog={blog}/>
        </div>
    </div>
    )
  }