import { useState } from "react"
import { Link } from "react-router-dom"

function HomePage() {
    
  
    return (
    
      
    <div className="homepage" style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
     
        <h1 className="homepage-title">Paris Tour Blog</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to="/blog">
          <button>Go to Blog</button>
        </Link>
    
    </div>

     
    )
  }
  
  export default HomePage