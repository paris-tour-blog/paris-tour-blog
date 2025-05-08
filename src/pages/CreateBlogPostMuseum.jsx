import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBlogPostMuseum() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [text, setText] = useState("");
	const [highlight, setHighlight] = useState("");
	const [tip, setTip] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const newPost = {
			title: title,
			description: description,
			text: text,
			highlight: highlight,
			tip: tip,
		};

		axios
			.post(
				"https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery.json",
				newPost
			)
			.then(() => {
				navigate("/Museums");
			})
			.catch((e) => console.log("Error creating a new project...", e));
	};

	return (
		<div className="CreateBlogPostMuseum">
			<h3>Add Museum Or Gallery</h3>

			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input
						type="text"
						name="title"
						placeholder="enter the title"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</label>

				<label>
					Description:
					<input
						type="text"
						name="description"
						placeholder="enter the description"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<label>
						Text:
						<textarea
							name="text"
							rows={4}
							cols={30}
							placeholder="Modify Tip"
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
					</label>
					<label>
						Highlight:
						<input
							type="text"
							name="highlight"
							placeholder="enter the highlight"
							value={highlight}
							onChange={(e) => {
								setHighlight(e.target.value);
							}}
						/>
					</label>
				</label>

				<label>
					Tip:
					<input
						type="text"
						name="description"
						placeholder="enter the description"
						value={tip}
						onChange={(e) => {
							setTip(e.target.value);
						}}
					/>
				</label>

				<button>Create</button>
			</form>
		</div>
	);
}

export default CreateBlogPostMuseum;
