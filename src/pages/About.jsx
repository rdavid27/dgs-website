import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const About = () => {
  return (
    <>
      <Helmet>
        <title>Our Story | David Gram Stores — Since 1962</title>
        <meta
          name="description"
          content="Learn about the heritage of David Gram Stores, founded in 1962 by Mr. David Gnanapragasam on the shores of Galle Face Green. Six decades of authentic Sri Lankan snacks."
        />
      </Helmet>

      <div className="about-container animate-fade-in">
        {/* Editorial Hero */}
        <div className="about-hero">
          <div className="container hero-inner text-center">
            <motion.span
              className="section-subtitle"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Since 1962
            </motion.span>
            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Six Decades of Handcrafted Sri Lankan Snacks
            </motion.h1>
            <motion.p
              className="about-hero-desc"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              Sourcing the finest local peanuts and ingredients to craft authentic savouries that bring people together.
            </motion.p>
          </div>
        </div>

        {/* Content & Story Grid */}
        <motion.div
          className="container about-content"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
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
                Success followed, and in 1978 he opened his first permanent shop at 214, Gasworks Street, Colombo 11. Under the name <strong>"DAVID GRAM STORES"</strong>, this iconic location continues to serve as our primary outlet and head office today.
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
        </motion.div>

        {/* Heritage Timeline Section */}
        <section className="timeline-section bg-tertiary">
          <div className="container">
            <motion.div
              className="text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-subtitle">The Journey</span>
              <h2 className="section-title">Our Milestone Timeline</h2>
            </motion.div>

            <motion.div
              className="timeline-tree"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div className="timeline-item left" variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="timeline-icon"><Calendar size={18} /></div>
                <div className="timeline-card">
                  <span className="timeline-year">1962</span>
                  <h4>The Galle Face Cart</h4>
                  <p>Late Mr. David Gnanapragasam starts selling peanuts and chickpeas from a single wooden cart at Galle Face Green, laying the foundation of DGS.</p>
                </div>
              </motion.div>

              <motion.div className="timeline-item right" variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="timeline-icon"><MapPin size={18} /></div>
                <div className="timeline-card">
                  <span className="timeline-year">1978</span>
                  <h4>First Flagship Outlet</h4>
                  <p>Opening of the flagship storefront at 214, Gasworks Street, Colombo 11. This becomes the wholesale hub and corporate head office.</p>
                </div>
              </motion.div>

              <motion.div className="timeline-item left" variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="timeline-icon"><Sparkles size={18} /></div>
                <div className="timeline-card">
                  <span className="timeline-year">2009</span>
                  <h4>Modern Snack Expansion</h4>
                  <p>Introduction of seasoned manioc chips, spicy flavored bites, and gourmet local sweets, expanding the catalog to cater to the modern palate.</p>
                </div>
              </motion.div>

              <motion.div className="timeline-item right" variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="timeline-icon"><ShieldCheck size={18} /></div>
                <div className="timeline-card">
                  <span className="timeline-year">Today</span>
                  <h4>Premium Legacy Continues</h4>
                  <p>Operating high-profile outlets including One Galle Face and Kandy City Centre, supplying leading hotels and event planners islandwide.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section container">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-subtitle">Our Promise</span>
            <h2 className="section-title">Values We Roast By</h2>
          </motion.div>
          <motion.div
            className="values-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="value-card" variants={fadeUp}>
              <ShieldCheck size={32} className="value-icon text-gold" />
              <h4>Quality First</h4>
              <p>We source only high-grade peanuts and 100% natural Sri Lankan spices. No artificial preservatives or flavor enhancers.</p>
            </motion.div>
            <motion.div className="value-card" variants={fadeUp}>
              <HeartHandshake size={32} className="value-icon text-gold" />
              <h4>Traditional Craft</h4>
              <p>We preserve original family roasting formulas, ensuring every pack has the identical flavor crafted by our founder in 1962.</p>
            </motion.div>
            <motion.div className="value-card" variants={fadeUp}>
              <Sparkles size={32} className="value-icon text-gold" />
              <h4>Community Focus</h4>
              <p>Supporting local spice farmers and maintaining fair trade practices, honoring the community that raised Mr. David Gnanapragasam's humble cart.</p>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;
