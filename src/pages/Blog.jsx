import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";


//je suis un peu perdu... Je sais pas si c'est mon code ou l'API qui bug et pose problème,
//mais je peux pas afficher la liste complète des musées et des friperies.
//En tout cas, beaucoup de choses vont changer, car ce code est qu'un test et un entraînement.
export default function Blog() {
    const [postsMuseum, setPostsMuseum] = useState([]);
  const [postsSecondHand, setPostsSecondHand] = useState([]);

  useEffect(() => {
    axios
      .get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery.json")
      .then((response) => {
        const postsMuseumObj = response.data || {};
        const postsMuseumArray = Object.keys(postsMuseumObj).map((id) => ({ //J'ai fait basiquement la meme chose qu'il nous a montré pour transformer les objets en array.
          id,
          ...postsMuseumObj[id],
        }));
        setPostsMuseum(postsMuseumArray);
      });
  }, []);  

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
      });
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
            <img
              src={post2.img}
              alt={post2.title}
              width="100%"
              style={{ borderRadius: "4px" }}
            />
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
