import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container animate-fade-in">
      <div className="about-hero">
        <div className="container">
          <h1 className="page-title text-center">Our Story</h1>
        </div>
      </div>
      
      <div className="container about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Humble Beginnings</h2>
            <p>
              David Gram Stores was founded by late Mr. David Gnanapragasam (1938 – 2009) in the year 1962. 
              In the early years, Mr. David was a cart vendor by the shores of Galle Face, selling peanuts and chickpeas.
            </p>
            <p>
              Later, succeeding through all the hard work, he opened his first shop at 214, gasworks street, 
              under the name “ DAVID GRAM STORES “. This location is yet our primary outlet and head office.
            </p>
            
            <h2 className="section-title" style={{ marginTop: '2rem' }}>Our Expertise</h2>
            <p>
              David Gram Stores is the leading snack manufacturer in Sri Lanka. Operating the business since 1962, 
              we are the experts in manufacturing traditional snacks. Our snack range consists of the traditional spicy 
              mixtures to flavoured bites and murukkus and not forgetting the manioc chips. 
            </p>
            <p>
              Our main ingredient in many of our snacks is the peanut, without which none would taste good. All our 
              clients cherish our quality and the enriching taste of mixtures and murukkus.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Traditional Spices and Snacks" 
              className="rounded-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
