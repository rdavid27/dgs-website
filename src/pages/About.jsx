import { Calendar, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container animate-fade-in">
      {/* Editorial Hero */}
      <div className="about-hero">
        <div className="container hero-inner text-center">
          <span className="section-subtitle">Since 1962</span>
          <h1 className="about-hero-title">Six Decades of Handcrafted Sri Lankan Snacks</h1>
          <p className="about-hero-desc">
            Sourcing the finest local peanuts and ingredients to craft authentic savouries that bring people together.
          </p>
        </div>
      </div>
      
      {/* Content & Story Grid */}
      <div className="container about-content">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title-left">Our Humble Beginnings</h2>
            <p className="lead">
              David Gram Stores was founded by the late Mr. David Gnanapragasam (1938 – 2009) in the year 1962.
            </p>
            <p>
              In the early years, Mr. David Gnanapragasam operated as a humble cart vendor by the windy shores of Galle Face Green, selling fresh peanuts and chickpeas to the locals who strolled by. Through sheer determination, hard work, and a secret recipe for spice mixtures, the cart vendor won the hearts of the Colombo community.
            </p>
            <p>
              Success followed, and in 1978 he opened his first permanent shop at 214, Gasworks Street, Colombo 11. Under the name <strong>“DAVID GRAM STORES”</strong>, this iconic location continues to serve as our primary outlet and head office today.
            </p>
            <p>
              Now, over 60 years later, we are proud to continue this legacy, expanding from a shoreside cart to a premium Sri Lankan brand loved across the nation.
            </p>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Premium roasted chickpeas and traditional Sri Lankan spices" 
                className="about-rounded-image"
              />
              <div className="experience-badge">
                <span className="num">60+</span>
                <span className="txt">Years of Trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Timeline Section */}
      <section className="timeline-section bg-tertiary">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">The Journey</span>
            <h2 className="section-title">Our Milestone Timeline</h2>
          </div>

          <div className="timeline-tree">
            {/* Timeline Item 1 */}
            <div className="timeline-item left">
              <div className="timeline-icon">
                <Calendar size={18} />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">1962</span>
                <h4>The Galle Face Cart</h4>
                <p>Late Mr. David Gnanapragasam starts selling peanuts and chickpeas from a single wooden cart at Galle Face Green, laying the foundation of DGS.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item right">
              <div className="timeline-icon">
                <MapPin size={18} />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">1978</span>
                <h4>First Flagship Outlet</h4>
                <p>Opening of the flagship storefront at 214, Gasworks Street, Colombo 11. This becomes the wholesale hub and corporate head office.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item left">
              <div className="timeline-icon">
                <Sparkles size={18} />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">2009</span>
                <h4>Modern Snack Expansion</h4>
                <p>Introduction of seasoned manioc chips, spicy flavored bites, and gourmet local sweets, expanding the catalog to cater to the modern palate.</p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="timeline-item right">
              <div className="timeline-icon">
                <ShieldCheck size={18} />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">Today</span>
                <h4>Premium Legacy Continues</h4>
                <p>Operating high-profile outlets including One Galle Face and Kandy City Centre, supplying leading hotels and event planners islandwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section container">
        <div className="text-center">
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Values We Roast By</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <ShieldCheck size={32} className="value-icon text-gold" />
            <h4>Quality First</h4>
            <p>We source only high-grade peanuts and 100% natural Sri Lankan spices. No artificial preservatives or flavor enhancers.</p>
          </div>
          <div className="value-card">
            <HeartHandshake size={32} className="value-icon text-gold" />
            <h4>Traditional Craft</h4>
            <p>We preserve original family roasting formulas, ensuring every pack has the identical flavor crafted by our founder in 1962.</p>
          </div>
          <div className="value-card">
            <Sparkles size={32} className="value-icon text-gold" />
            <h4>Community Focus</h4>
            <p>Supporting local spice farmers and maintaining fair trade practices, honoring the community that raised Mr. David Gnanapragasam's humble cart.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
