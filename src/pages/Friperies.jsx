import { useState, useEffect } from "react";
import axios from "axios";


function Friperies() {
  const [Friperies, setFriperies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand.json"
      )
      .then(response => {
        console.log("Museum API data:", response.data);
        const FriperiesObj = response.data || {};
        const FriperiesArray = Object.keys(FriperiesObj).map(id => ({
          id,
          ...FriperiesObj[id],
        }));
        setFriperies(FriperiesArray);
      })
      .catch(e => console.log('Error getting characters from the api...', e));
  }, []);

  return (
    <div>
      <h1>Paris Friperies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {Friperies.map(post => (
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
    </div>
  );
}

export default Friperies;