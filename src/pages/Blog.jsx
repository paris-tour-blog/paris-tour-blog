import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import Museums from "./Museums";
import MuseumPosts from "./MuseumPosts";


export default function Blog() {
  const [postsMuseum, setPostsMuseum] = useState([]);
  const [postsSecondHand, setPostsSecondHand] = useState([]);
  const [postsRestaurant, setPostsRestaurant] = useState([]);

  useEffect(() => {
    axios
      .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery.json")
      .then((response) => {
       
        const postsMuseumObj = response.data || {};
        const postsMuseumArray = Object.keys(postsMuseumObj).map((id) => ({
          id,
          ...postsMuseumObj[id],
        }));
        
        setPostsMuseum(postsMuseumArray);
      })
      .catch((e) => console.log('Error getting characters from the api...', e));
    }, []);

    const handleDeleteMuseum = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this museum?");
      if (!confirmDelete) return;
      axios
        .delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery/${id}.json`)
        .then(() => {
          setPostsMuseum((prevPosts) => prevPosts.filter((post) => post.id !== id));
         
        })
        .catch((e) => console.log('Error deleting museum...', e));
    };

    

  useEffect(() => {
    axios
      .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand.json")
      .then((response) => {
        
       
        const postsSecondHandObj = response.data || {};
        const postsSecondHandArray = Object.keys(postsSecondHandObj).map((id) => ({
          id,
          ...postsSecondHandObj[id],
        }));
        setPostsSecondHand(postsSecondHandArray);
        
       
      })
      .catch((e) => console.log('Error getting characters from the api...', e));
    }, []);

    const handleDeleteFriperies = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this second hand shop?");
      if (!confirmDelete) return;
      axios
        .delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand/${id}.json`)
        .then(() => {
          setPostsSecondHand((prevPosts) => prevPosts.filter((post) => post.id !== id));
         
        })
        .catch((e) => console.log('Error deleting friperie...', e));
    };
   

    useEffect(() => {
  axios
    .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant.json")
    .then((response) => {
     
      const postsRestaurantObj = response.data || {};
      const postsRestaurantArray = Object.keys(postsRestaurantObj).map((id) => ({
        id,
        ...postsRestaurantObj[id],
      }));
      setPostsRestaurant(postsRestaurantArray);
    })
    .catch((e) => console.log('Error getting restaurants from the api...', e));
  }, []);
   

  const handleDeleteRestaurants = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this second hand shop?");
    if (!confirmDelete) return;
    axios
      .delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant/${id}.json`)
      .then(() => {
        setPostsRestaurant((prevPosts) => prevPosts.filter((post) => post.id !== id));
       
      })
      .catch((e) => console.log('Error deleting friperie...', e));
  };

  return (
    
    <div>
      
      <h1>Paris Museums and Galleries</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {postsMuseum.map((post) => (
          
          <div
            className="card"
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
            }}
          >
            <Link to = {`/MuseumPosts/${post.id}`}>
            <p>
              <strong>Name:</strong> {post.title}
            </p>
            <img
              src={post.img}
              alt={post.title}
              width="100%"
              style={{ borderRadius: "4px" }}
            />
            <p>{post.description}</p>
            <p>
              <strong>Highlight:</strong> {post.highlight}
            </p>
            <p>
              <strong>Tip:</strong> {post.tip}
            </p>
            </Link>
            <div>
            <Link to = "/EditBlogs">
            <button>Edit</button> </Link> <button onClick={() => handleDeleteMuseum(post.id)}>Delete</button>
            
            </div>
            
           
          </div>
          
        ))}
       
      </div>
      

      <h1>Paris second-hand stores and nice spots</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {postsSecondHand.map((post2) => (
          <div
            className="card"
            key={post2.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
            }}
          >
            <Link to = {`/FriperiesPosts/${post2.id}`}>
            <p>
              <strong>Name:</strong> {post2.title}
            </p>
            
            <p>{post2.description}</p>
            <p>
              <strong>Highlight:</strong> {post2.highlight}
            </p>
            <p>
              <strong>Tip:</strong> {post2.tip}
            </p>
            </Link>
            <div>

              <button>Edit</button> <button onClick={() => handleDeleteFriperies(post2.id)}>Delete</button>
            </div>

          </div>

        ))}
      </div>
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
          ><Link to = {`/RestaurantsPosts/${post3.id}`}>
            <p>
              <strong>Name:</strong> {post3.title}
            </p>
            <p>{post3.description}</p>
            <p>
              📍{post3.adress}
            </p>
            </Link>
            <Link to = "/EditBlogs">
            <button>Edit</button> </Link><button onClick={() => handleDeleteRestaurants(post3.id)}>Delete</button>
          </div>
          
))}
      </div>
    </div>
  );
}