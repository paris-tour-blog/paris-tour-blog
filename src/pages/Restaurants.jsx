import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import { API_URL } from "../Config/api";




function Restaurants(){
    const [postsRestaurant, setPostsRestaurant] = useState([]);


    useEffect(() => {
        axios
          .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant.json")
          .then((response) => {
            console.log("Restaurants API data:", response.data);
            const postsRestaurantObj = response.data || {};
            const postsRestaurantArray = Object.keys(postsRestaurantObj).map((id) => ({
              id,
              ...postsRestaurantObj[id],
            }));
            setPostsRestaurant(postsRestaurantArray);
          })
          .catch((e) => console.log('Error getting restaurants from the api...', e));
        }, []);

        const handleDeleteRestaurant = (id) => {
          const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
          if (!confirmDelete) return;
          axios
            .delete(`${API_URL}/restaurant/${id}.json`)
            .then(() => {
              setPostsRestaurant((prevPosts) => prevPosts.filter((post3) => post3.id !== id));
              console.log(`Deleted restaurant with id ${id}`);
            })
            .catch((e) => console.log('Error deleting restaurant...', e));
        };


        return (
            <div className="posts">
              <h1>Restaurants</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {postsRestaurant.map((post3) => (
                  <div
                    className="card"
                    key={post3.id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      width: "300px",
                      borderRadius: "8px",
                    }}
                  >
                    <Link to={`/RestaurantsPosts/${post3.id}`}>
                    <p>
                      <strong>{post3.title}</strong> 
                      <img
								src={post3.img}
                alt="restaurant"
								width="270px"
								height="200px"
								style={{ objectFit: "cover", borderRadius: "4px" }}
							/>
                    </p>
                    <p>{post3.description}</p>
                    <div>
                    <p>📍{post3.adress}</p>
                    </div>
                    </Link>
                    <div>
                    <Link to={`/EditBlogRestaurant/${post3.id}`}>
                <button>Edit</button>
              </Link> <button onClick={() => handleDeleteRestaurant(post3.id)}>Delete</button>
            </div>
                  </div>
                ))}
              </div>
            </div>
          
        )

}
export default Restaurants