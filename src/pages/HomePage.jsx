import { useState } from "react"
import { Link } from "react-router-dom"

function HomePage() {
    
  
    return (
    
    <div>
      <div>
        <h1>Les Parisiens</h1>
        <Link to="/blog">
          <button>Go to Blog</button>
        </Link>
      </div>
    </div>

     
    )
  }
  
  export default HomePage