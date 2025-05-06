import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import Museums from "./Museums";



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


        return (
            <div>
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
                    <p>
                      <strong>Name:</strong> {post3.title}
                    </p>
                    <p>{post3.description}</p>
                    <p>
                      <strong>:round_pushpin:</strong> {post3.Adress}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          
        )

}
export default Restaurants