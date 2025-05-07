import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Blog() {
	const [postsMuseum, setPostsMuseum] = useState([]);
	const [postsSecondHand, setPostsSecondHand] = useState([]);
	const [postsRestaurant, setPostsRestaurant] = useState([]);
	const [filteredMuseum, setFilteredMuseum] = useState([]);
	const [filteredFriperie, setFilteredFriperie] = useState([]);
	const [filteredRestaurant, setFilteredRestaurant] = useState([]);

	useEffect(() => {
		axios.get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery.json")
			.then((response) => {
				const data = response.data || {};
				const array = Object.keys(data).map((id) => ({ id, ...data[id] }));
				setPostsMuseum(array);
				setFilteredMuseum(array);
			})
			.catch((e) => console.log("Error getting museums...", e));
	}, []);

	useEffect(() => {
		axios.get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand.json")
			.then((response) => {
				const data = response.data || {};
				const array = Object.keys(data).map((id) => ({ id, ...data[id] }));
				setPostsSecondHand(array);
				setFilteredFriperie(array);
			})
			.catch((e) => console.log("Error getting second-hand stores...", e));
	}, []);

	useEffect(() => {
		axios.get("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant.json")
			.then((response) => {
				const data = response.data || {};
				const array = Object.keys(data).map((id) => ({ id, ...data[id] }));
				setPostsRestaurant(array);
				setFilteredRestaurant(array);
			})
			.catch((e) => console.log("Error getting restaurants...", e));
	}, []);

	const handleDeleteMuseum = (id) => {
		if (!window.confirm("Are you sure you want to delete this museum?")) return;
		axios.delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/museumgallery/${id}.json`)
			.then(() => {
				const updated = postsMuseum.filter((post) => post.id !== id);
				setPostsMuseum(updated);
				setFilteredMuseum(updated);
			})
			.catch((e) => console.log("Error deleting museum...", e));
	};

	const handleDeleteFriperies = (id) => {
		if (!window.confirm("Are you sure you want to delete this second hand shop?")) return;
		axios.delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/secondhand/${id}.json`)
			.then(() => {
				const updated = postsSecondHand.filter((post) => post.id !== id);
				setPostsSecondHand(updated);
				setFilteredFriperie(updated);
			})
			.catch((e) => console.log("Error deleting friperie...", e));
	};

	const handleDeleteRestaurants = (id) => {
		if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
		axios.delete(`https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant/${id}.json`)
			.then(() => {
				const updated = postsRestaurant.filter((post) => post.id !== id);
				setPostsRestaurant(updated);
				setFilteredRestaurant(updated);
			})
			.catch((e) => console.log("Error deleting restaurant...", e));
	};

	const onChange = (e) => {
		const value = e.target.value.toLowerCase();
		setFilteredMuseum(
			postsMuseum.filter(
				(post) =>
					post.title.toLowerCase().includes(value) ||
					post.description.toLowerCase().includes(value) ||
					post.highlight.toLowerCase().includes(value) ||
					post.tip.toLowerCase().includes(value)
			)
		);
		setFilteredFriperie(
			postsSecondHand.filter(
				(post) =>
					post.title.toLowerCase().includes(value) ||
					post.description.toLowerCase().includes(value) ||
					post.highlight.toLowerCase().includes(value) ||
					post.tip.toLowerCase().includes(value)
			)
		);
		setFilteredRestaurant(
			postsRestaurant.filter(
				(post) =>
					post.title.toLowerCase().includes(value) ||
					post.description.toLowerCase().includes(value) ||
					post.adress.toLowerCase().includes(value)
			)
		);
	};

	return (
		<div>
			<SearchBar onChange={onChange} />
			<h1>Museums and Galleries</h1>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
				{filteredMuseum.map((post) => (
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
						<Link to={`/MuseumPosts/${post.id}`}>
							<p><strong>Name:</strong> {post.title}</p>
							<img
								src={post.img}
								alt={post.title}
								width="270px"
								height="200px"
								style={{ objectFit: "cover", borderRadius: "4px" }}
							/>
							<p>{post.description}</p>
							<p><strong>Highlight:</strong> {post.highlight}</p>
							<p><strong>Tip:</strong> {post.tip}</p>
						</Link>
						<div>
							<Link to={`/EditBlogs/${post.id}`}>
								<button>Edit</button>
							</Link>
							<button onClick={() => handleDeleteMuseum(post.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>

			<h1>Second-hand stores noteworthy spots</h1>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
				{filteredFriperie.map((post2) => (
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
						<Link to={`/FriperiesPosts/${post2.id}`}>
							<p><strong>Name:</strong> {post2.title}</p>
							<p>{post2.description}</p>
							<p><strong>Highlight:</strong> {post2.highlight}</p>
							<p><strong>Tip:</strong> {post2.tip}</p>
						</Link>
						<div>
							<Link to={`/EditBlogFriperies/${post2.id}`}>
								<button>Edit</button>
							</Link>
							<button onClick={() => handleDeleteFriperies(post2.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>

			<h1>Restaurants</h1>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
				{filteredRestaurant.map((post3) => (
					<div
						className="card"
						key={post3.id}
						style={{
							border: "1px solid #ccc",
							padding: "10px",
							width: "300px",
							borderRadius: "8px",
						}}
					>
						<Link to={`/RestaurantsPosts/${post3.id}`}>
							<p><strong>Name:</strong> {post3.title}</p>
							<p>{post3.description}</p>
							<p>📍{post3.adress}</p>
						</Link>
						<Link to={`/EditBlogRestaurant/${post3.id}`}>
							<button>Edit</button>
						</Link>
						<button onClick={() => handleDeleteRestaurants(post3.id)}>Delete</button>
					</div>
				))}
			</div>
		</div>
	);
}
