import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"



function CreateBlogPostRestaurant() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [adress, setAdress]= useState("")

    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            "title": title,
            "description": description,
            "adress": adress
        }

        axios.post("https://parisguideproject-default-rtdb.europe-west1.firebasedatabase.app/restaurant.json", newPost)
            .then(() => {
                navigate("/Restaurants")
            })
            .catch(e => console.log("Error creating a new project...", e));
    }


    return (
        <div className="CreateBlog">
            
            <h3>Add A Restaurant</h3>

            <form onSubmit={handleSubmit}>

                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="enter the title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        placeholder="enter the description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </label>
                <label>
                    Adress:
                    <input
                        type="text"
                        name="description"
                        placeholder="enter the description"
                        value={adress}
                        onChange={(e) => { setAdress(e.target.value) }}
                    />
                </label>
                <button>Create</button>

            </form>
        </div>
    )
}

export default CreateBlogPostRestaurant