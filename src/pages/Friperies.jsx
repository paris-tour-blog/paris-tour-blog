import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Config/api";

function Friperies() {
  const [postsSecondHand, setPostsSecondHand] = useState([]);

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

  const handleDeleteFriperies = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this second hand shop?");
    if (!confirmDelete) return;
    axios
      .delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand/${id}.json`)
      .then(() => {
        setPostsSecondHand((prevPosts) => prevPosts.filter((post) => post.id !== id));
        console.log(`Deleted second hand with id ${id}`);
      })
      .catch((e) => console.log('Error deleting friperie...', e));
  };

  return (
    <div>
      <h1>Paris Friperies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {postsSecondHand.map((post) => (
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
            <div>
              <button>Edit</button> <button onClick={() => handleDeleteFriperies(post.id)} >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friperies;
