import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog";
import { API_URL } from "../Config/api";
import { Link } from 'react-router-dom'

function RestaurantsDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/restaurant/${id}.json`)
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
            <div className="blog-post">
                <h1>{post.title}</h1>
                <img
              src={post.img}
              alt= "restaurant"
              width="270px"
              height="200px"
              style={{ objectFit: "cover", borderRadius: "4px" }}
            />
                <p><strong>Description:</strong> {post.description}</p>
                <p> {post.adress}</p>
            </div>
            <Link to={`/EditBlogRestaurant/${id}`}>
                <button>Edit</button>
              </Link> <Link to="/blog"> <button>Back</button>
            </Link>
        </div>
    );
}

export default RestaurantsDetails;