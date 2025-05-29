// Or next/link if you're using Next.js
import "../../css/home/home.css";
// import { Link } from "react-router-dom";
// import heroImage from "../../assets/img/hero-section/hero_crm.jpg"; // adjust path as needed

// import backgroundImage from "../../assets/img/hero-section/4680.jpg";

// import "../../css/hero/hero.css"; // create this for styles

const HeroSection = ({ backgroundImage, title, subtitle }) => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 0",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;
