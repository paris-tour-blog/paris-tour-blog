import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Config/api";

function Museums() {
  const [Museums, setMuseums] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/museumgallery.json`
      )
      .then((response) => {
        console.log("Museum API data:", response.data);
        const MuseumsObj = response.data || {};
        const MuseumsArray = Object.keys(MuseumsObj).map((id) => ({
          id,
          ...MuseumsObj[id],
        }));
        setMuseums(MuseumsArray);
      })
      .catch((e) => console.log("Error getting characters from the api...", e));
  }, []);

  const handleDeleteMuseum = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this museum?");
    if (!confirmDelete) return;
    axios
      .delete(`${API_URL}/museumgallery/${id}.json`)
      .then(() => {
        setMuseums((prevPosts) => prevPosts.filter((post) => post.id !== id));
        console.log(`Deleted museum with id ${id}`);
      })
      .catch((e) => console.log('Error deleting museum...', e));
  };

    
  

  return (
    <div>
      <h1>Paris Museums and Galleries</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Museums.map((post) => (
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
              <button>Edit</button> <button onClick={() => handleDeleteMuseum(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Museums;
