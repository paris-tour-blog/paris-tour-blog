import { Link } from "react-router-dom";

function About() {
  return (<div className="about-page" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
    <h1>About Paris Tour Blog</h1>
    <p>
      Welcome to <strong>Paris Tour Blog</strong> — a blog created with love and curiosity by 
      Mohamed and Neko, two friends fascinated by the charm, complexity, and beauty of Paris.
    </p>
    <p>
      Here, we share stories, photos, and personal impressions from the streets, cafés, museums, 
      hidden corners, and vibrant neighborhoods of Paris. Whether you’re a local, a dreamer, 
      or someone planning their first trip to the City of Light, we hope our posts inspire you 
      to explore and fall in love with Paris as much as we have.
    </p>
    <p>
      From classic landmarks like the Eiffel Tower and Montmartre to everyday Parisian life, 
      we aim to capture both the well-known and the unexpected sides of this amazing city.
    </p>
    <p>
      Thank you for joining us on this journey — and feel free to leave us a message or 
      connect through our blog!
    </p>
    <Link to="/blog">
      <button>Back to Blog</button>
    </Link>
    </div>
    );
  }

export default About;
