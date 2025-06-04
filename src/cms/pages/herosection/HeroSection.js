// src/components/hero/HeroSection.jsx
// import React from "react";
import { Link } from "react-router-dom";
import "../../css/herosection/heroSection.css";
import heroImage from "../../assets/img/crm-me.jpeg"; // adjust path as needed
import BackgroundImage from "../../assets/img/hero-section/4680.jpg";
// { homeData }
const HeroSection = () => {
    const homeData = {
        title: "Empowering Businesses with CRM & Digital Marketing",
        subtitle: "Streamline Customer Management and Boost Online Presence",
        intro_text:
            "Our CRM solutions help you nurture leads, automate workflows, and enhance customer engagement. Combine that with our expert digital marketing services to amplify your brand’s reach and drive sustainable growth.",
        button_text: "Get Started",
        button_link: "/request-demo",
        hero_image: heroImage,
        background_image: BackgroundImage,
    };

    return (
        <div
            className="hero-section"
            style={{ backgroundImage: `url(${homeData.background_image})` }}
        >
            <div className="container hero-container">
                <div className="hero-content">
                    <h1>{homeData.title}</h1>
                    <h2>{homeData.subtitle}</h2>
                    <p>{homeData.intro_text}</p>
                    <Link to={homeData.button_link} className="btn hero-btn">
                        {homeData.button_text}
                    </Link>
                </div>
                <div className="hero-image">
                    <img src={homeData.hero_image || "/placeholder.svg"} alt="Hero" />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
