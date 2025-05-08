import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBlogs() {
  const { id } = useParams();
  const [editMuseumTitle, setMuseumTitle] = useState("");
  const [editMuseumText, setEditMuseumText] = useState("");
  const [editMuseumHigh, setEditMuseumHigh] = useState("");
  const [editMuseumTip, setEditMuseumTip] = useState("");
  const [editMuseumDesc, setEditMuseumDesc] = useState("");
  const [editMuseumImg, setEditMuseumImg] = useState ("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery/${id}.json`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            setMuseumTitle(data.title || "");
            setEditMuseumText(data.text || "");
            setEditMuseumHigh(data.highlight || "");
            setEditMuseumTip(data.tip || "");
            setEditMuseumDesc(data.description || "");
            setEditMuseumImg(data.img || "");
          } else {
            console.log("No data found for this id.");
          }
        })
        .catch((e) => console.log("Error getting museum from API:", e));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMuseumEntry = {
      title: editMuseumTitle,
      text: editMuseumText,
      highlight: editMuseumHigh,
      tip: editMuseumTip,
      description: editMuseumDesc,
      img: editMuseumImg,
    };

    axios
      .put(
        `https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery/${id}.json`,
        updatedMuseumEntry
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
        <h1>Edit Museum:</h1>
        <label>
          <strong>Museum Name: </strong>
          <input
            name="title"
            placeholder="Title"
            value={editMuseumTitle}
            onChange={(e) => setMuseumTitle(e.target.value)}
          />
        </label>
        <strong>Content: </strong>
        <label>
        <textarea 
            name="text"
            rows={4} cols={60}
            placeholder="Text"
            value={editMuseumText}
            onChange={(e) => setEditMuseumText(e.target.value)}
            />
        </label>
        <strong>Highlight: </strong>
        <label>
        <textarea 
            name="highlight"
            rows={4} cols={40}
            placeholder="Modify Highlight"
            value={editMuseumHigh}
            onChange={(e) => setEditMuseumHigh(e.target.value)}
          />
        </label>
        <strong>Tip: </strong>
        <label>
        <textarea
            name="tip"
            rows={4} cols={30}
            placeholder="Modify Tip"
            value={editMuseumTip}
            onChange={(e) => setEditMuseumTip(e.target.value)}
          />
        </label>
        <strong>Description: </strong>
        <label>
        <textarea
            name="description"
            rows={4} cols={20}
            placeholder="Modify Description"
            value={editMuseumDesc}
            onChange={(e) => setEditMuseumDesc(e.target.value)}
          />
        </label>
        <strong>Photo:</strong>
        <label>
        <input
            name="url"
            placeholder="Modify Description"
            value={editMuseumImg}
            onChange={(e) => setEditMuseumImg(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditBlogs;
