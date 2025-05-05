import { useState } from "react"
import { Link } from "react-router-dom"
function HomePage() {
    const [blog, setBlog] = useState(false)
  
    return (
    
      <div>
      <h1>Les Parisiens</h1>
     <Link to="/blog">
      <button>Go to Blog</button>
      </Link>
      </div>

     
    )
  }
  
  export default HomePage