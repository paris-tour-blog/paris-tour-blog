import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog";
import { API_URL } from "../Config/api";
import { Link } from 'react-router-dom'

function MuseumPostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        
        axios.get(`${API_URL}/museumgallery/${id}.json`)
            .then((response) => {
                setPost(response.data);
               
            })
            .catch(e => console.log("Error getting post details from the API...", e));
    }, [id]);
    
 
    if (post === null) {
        return <h3>Loading...</h3>;
    }

    return (
        <div>
            <div className="blog-post" >
                <h1>{post.title}</h1>
                <img src ={post.img}/>
                <p> <strong>Highlight:</strong> {post.highlight}</p>
                <p> {post.text}</p>
                <p><strong>Tip:</strong>{post.tip}</p>
            </div>
            <button>Like</button> <button>Edit</button> <Link to="/blog"> <button>Back</button>
            </Link>
        </div>
    );
}

export default MuseumPostDetails;