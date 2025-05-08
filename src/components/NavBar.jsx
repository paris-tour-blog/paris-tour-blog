import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";

function NavBar() {
    const [isCategoriesOpen, setCategoriesOpen] = useState(false);
    const [isCreateBlogPostOpen, setCreateBlogPostOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleCategories = () => {
        setCategoriesOpen(!isCategoriesOpen);
    };

    const toggleCreateBlogPost = () => {
        setCreateBlogPostOpen(!isCreateBlogPostOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="Navbar">
            <button className="burger-menu" onClick={toggleMobileMenu}>
                ☰
            </button>
            <div className={`navbar-buttons ${isMobileMenuOpen ? "open" : ""}`}>
                <NavLink to="/">
                    <button>Home</button>
                </NavLink>
                <NavLink to="/Blog">
                    <button>Blog</button>
                </NavLink>
                <div className="accordion">
                    <button onClick={toggleCategories}>
                        Categories
                    </button>
                    {isCategoriesOpen && (
                        <div className="accordion-content">
                            <NavLink to="/Museums">
                                <button>Museums</button>
                            </NavLink>
                            <NavLink to="/Friperies">
                                <button>Friperies</button>
                            </NavLink>
                            <NavLink to="/Restaurants">
                                <button>Restaurants</button>
                            </NavLink>
                        </div>
                    )}
                </div>
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