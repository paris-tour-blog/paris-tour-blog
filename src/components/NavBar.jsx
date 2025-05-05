import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom"; 

function NavBar(){
    const [isCategoriesOpen, setCategoriesOpen] = useState(false);
    const [isCreateBlogPostOpen, setCreateBlogPostOpen] = useState(false);

    const toggleCategories = () => {
        setCategoriesOpen(!isCategoriesOpen);
    };

    const toggleCreateBlogPost = () => {
        setCreateBlogPostOpen(!isCreateBlogPostOpen);
    };

    return (
        <nav className="Navbar">
            <div className="navbar-buttons">
                <NavLink to="/">
                    <button>Home</button>
                </NavLink>
                <NavLink to="/BLog">
                    <button>Blog</button>
                </NavLink>
                <div className="accordion">
                    <button onClick={toggleCategories}>
                        Categories
                    </button>
                    {isCategoriesOpen && (
                        <div className="accordion-content">
                            <Link to="/Museums">
                                <button>Museums</button>
                            </Link>
                            <Link to="/Friperies">
                                <button>Friperies</button>
                            </Link>
                            <Link to="/Restaurants">
                                <button>Restaurants</button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Separate Accordion Component */}
                <div className="accordion">
                    <button onClick={toggleCreateBlogPost}>
                        Create A Blog Post
                    </button>
                    {isCreateBlogPostOpen && (
                        <div className="accordion-content">
                            <NavLink to="/CreateBlogPostMuseum">
                                <button>Add A Museum</button>
                            </NavLink>
                            <NavLink to="/CreateBlogPostFriperie">
                                <button>Add A Friperie</button>
                            </NavLink>
                            <NavLink to="/CreateBlogPostResto">
                                <button>Add A Restaurant</button>
                            </NavLink>
                        </div>
                    )}
                </div>

                <NavLink to="/About">
                    <button>About</button>
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;