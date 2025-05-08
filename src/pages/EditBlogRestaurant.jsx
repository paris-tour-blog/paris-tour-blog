import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Textarea } from "@mantine/core";

function EditBlogRestaurant() {
	const { id } = useParams();
	const [editRestaurantTitle, setRestaurantTitle] = useState("");
	const [editRestaurantAdd, setEditRestaurantAdd] = useState("");
	const [editRestaurantDesc, setEditRestaurantDesc] = useState("");
	const [editRestaurantImg, setEditRestaurantImg] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			axios
				.get(
					`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant/${id}.json`
				)
				.then((response) => {
					const data = response.data;
					if (data) {
						setRestaurantTitle(data.title || "");
						setEditRestaurantAdd(data.adress || "");
						setEditRestaurantDesc(data.description || "");
						setEditRestaurantImg(data.img || "");
					} else {
						console.log("No data found for this id.");
					}
				})
				.catch((e) => console.log("Error getting friperie from API:", e));
		}
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const updatedRestaurantEntry = {
			title: editRestaurantTitle,
			adress: editRestaurantAdd,
			description: editRestaurantDesc,
			img: editRestaurantImg,
		};

		axios
			.put(
				`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant/${id}.json`,
				updatedRestaurantEntry
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
				<h1>Edit Restaurant:</h1>
				<label>
					<strong>Restaurant Name: </strong>
					<input
						name="title"
						placeholder="Title"
						value={editRestaurantTitle}
						onChange={(e) => setRestaurantTitle(e.target.value)}
					/>
				</label>
				<label>
					<strong>Description: </strong>
					<textarea
						name="description"
						rows={4}
						cols={60}
						placeholder="Modify Description"
						value={editRestaurantDesc}
						onChange={(e) => setEditRestaurantDesc(e.target.value)}
					/>
				</label>

				<strong>Address: </strong>
				<label>
					<textarea
						name="adress"
						rows={2}
						cols={20}
						placeholder="Address"
						value={editRestaurantAdd}
						onChange={(e) => setEditRestaurantAdd(e.target.value)}
					/>
				</label>

				<strong>Photo: </strong>
				<label>
					<input
						name="url"
						placeholder="Photo"
						value={editRestaurantImg}
						onChange={(e) => setEditRestaurantImg(e.target.value)}
					/>
				</label>

				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default EditBlogRestaurant;
