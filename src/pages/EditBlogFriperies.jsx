import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Textarea } from "@mantine/core";

function EditBlogFriperies() {
    const { id } = useParams();
    const [editFriperiesTitle, setFriperiesTitle] = useState("");
  const [editFriperiesText, setEditFriperiesText] = useState("");
  const [editFriperiesHigh, setEditFriperiesHigh] = useState("");
  const [editFriperiesTip, setEditFriperiesTip] = useState("");
  const [editFriperiesDesc, setEditFriperiesDesc] = useState("");
  const [editFriperieImg, setEditFriperieImg] = useState ("");
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand/${id}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            setFriperiesTitle(data.title || "");
            setEditFriperiesText(data.text || "");
            setEditFriperiesHigh(data.highlight || "");
            setEditFriperiesTip(data.tip || "");
            setEditFriperiesDesc(data.description || "");
            setEditFriperieImg(data.img || "");
          } else {
            console.log("No data found for this id.");
          }
        })
        .catch((e) => console.log("Error getting friperie from API:", e));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFriperiesEntry = {
      title: editFriperiesTitle,
      text: editFriperiesText,
      highlight: editFriperiesHigh,
      tip: editFriperiesTip,
      description: editFriperiesDesc,
      img: editFriperieImg,
    };

    axios
    .put(
      `https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand/${id}.json`,
      updatedFriperiesEntry
    )
    .then((response) => {
      console.log("Update successful:", response.data);
      navigate("/blog");
    })
    .catch((e) => console.log("Error updating the entry:", e));
};
return (
    <div className="edit-blog">
    <form onSubmit={handleSubmit}>
        <h1>Edit Blog:</h1>
        <label>
          <strong>Museum Name: </strong>
          <input
            name="title"
            placeholder="Title"
            value={editFriperiesTitle}
            onChange={(e) => setFriperiesTitle(e.target.value)}
          />
        </label>
        <strong>Content: </strong>
        <label>
        <textarea 
            name="text"
            rows={4} cols={60}
            placeholder="Text"
            value={editFriperiesText}
            onChange={(e) => setEditFriperiesText(e.target.value)}
            />
        </label>
        <strong>Highlight: </strong>
        <label>
        <textarea 
            name="highlight"
            rows={4} cols={40}
            placeholder="Modify Highlight"
            value={editFriperiesHigh}
            onChange={(e) => setEditFriperiesHigh(e.target.value)}
          />
        </label>
        <strong>Tip: </strong>
        <label>
        <textarea
            name="tip"
            rows={4} cols={30}
            placeholder="Modify Tip"
            value={editFriperiesTip}
            onChange={(e) => setEditFriperiesTip(e.target.value)}
          />
        </label>
        <strong>Description: </strong>
        <label>
        <textarea
            name="description"
            rows={4} cols={20}
            placeholder="Modify Description"
            value={editFriperiesDesc}
            onChange={(e) => setEditFriperiesDesc(e.target.value)}
          />
        </label>
        <strong>Photo: </strong>
        <label>
        <input
            name="url"
            placeholder="Add a photo"
            value={editFriperieImg}
            onChange={(e) => setEditFriperieImg(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditBlogFriperies;