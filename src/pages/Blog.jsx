import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";



export default function Blog() {
  const [postsMuseum, setPostsMuseum] = useState([]);
  const [postsSecondHand, setPostsSecondHand] = useState([]);

  useEffect(() => {
    axios
      .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery.json")
      .then((response) => {
        console.log("Museum API data:", response.data);
        const postsMuseumObj = response.data || {};
        const postsMuseumArray = Object.keys(postsMuseumObj).map((id) => ({
          id,
          ...postsMuseumObj[id],
        }));
        setPostsMuseum(postsMuseumArray);
      })
      .catch((e) => console.log('Error getting characters from the api...', e));
    }, []);

  useEffect(() => {
    axios
      .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand.json")
      .then((response) => {
        
        console.log("Secondhand API data:", response.data);
        const postsSecondHandObj = response.data || {};
        const postsSecondHandArray = Object.keys(postsSecondHandObj).map((id) => ({
          id,
          ...postsSecondHandObj[id],
        }));
        setPostsSecondHand(postsSecondHandArray);
        console.log("..........")
        console.log(postsSecondHandArray)
      })
      .catch((e) => console.log('Error getting characters from the api...', e));
    }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}
