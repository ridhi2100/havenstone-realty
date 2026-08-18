import { useState } from "react";

import {
  ArrowRight,
  BedDouble,
  Bath,
  Building2,
  Check,
  ChevronDown,
  CircleCheck,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";

const properties = [
  {
    id: 1,
    name: "The Grand Residency",
    type: "Apartment",
    purpose: "Buy",
    location: "Gurgaon",
    price: "₹1.25 Cr",
    priceValue: 125,
    bedrooms: 3,
    bathrooms: 3,
    area: "1,850 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A spacious modern apartment designed for comfortable family living with premium interiors and excellent connectivity.",
  },
  {
    id: 2,
    name: "Palm Grove Villas",
    type: "Villa",
    purpose: "Buy",
    location: "Noida",
    price: "₹2.10 Cr",
    priceValue: 210,
    bedrooms: 4,
    bathrooms: 4,
    area: "3,200 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    description:
      "A luxurious independent villa with generous living spaces, private outdoor areas and a peaceful neighbourhood.",
  },
  {
    id: 3,
    name: "Skyline Heights",
    type: "Apartment",
    purpose: "Rent",
    location: "Delhi",
    price: "₹78 Lakh",
    priceValue: 78,
    bedrooms: 2,
    bathrooms: 2,
    area: "1,250 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    description:
      "A stylish 2 BHK apartment offering contemporary design, natural light and convenient access to key city locations.",
  },
  {
    id: 4,
    name: "Central Business Plaza",
    type: "Commercial",
    purpose: "Buy",
    location: "Gurgaon",
    price: "₹85 Lakh",
    priceValue: 85,
    bedrooms: null,
    bathrooms: null,
    area: "1,600 sq.ft.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    description:
      "A premium commercial office space in a strategic business district, ideal for growing companies and investors.",
  },
];

const services = [
  {
    icon: Home,
    title: "Property Buying",
    description:
      "Find properties that match your requirements, lifestyle and budget.",
  },
  {
    icon: Building2,
    title: "Property Selling",
    description:
      "Reach the right buyers and position your property for the best value.",
  },
  {
    icon: KeyIcon,
    title: "Property Rentals",
    description:
      "Discover reliable rental properties for homes and businesses.",
  },
  {
    icon: Target,
    title: "Property Consultation",
    description:
      "Get guidance on locations, properties and investment opportunities.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "Carefully selected properties from trusted sources and developers.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "In-depth knowledge of locations, neighbourhoods and property markets.",
  },
  {
    icon: CircleCheck,
    title: "Transparent Process",
    description:
      "Clear communication and straightforward guidance throughout.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Personal assistance from your first enquiry to closing.",
  },
];

function KeyIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778Z" />
      <path d="m15.5 8.5 3 3" />
      <path d="m13 11 3 3" />
    </svg>
  );
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [filters, setFilters] = useState({
    location: "All",
    type: "All",
    purpose: "All",
    budget: "All",
  });

  const [selectedProperty, setSelectedProperty] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      filters.location === "All" ||
      property.location.toLowerCase() === filters.location.toLowerCase();

    const typeMatch =
      filters.type === "All" ||
      property.type.toLowerCase() === filters.type.toLowerCase();

    const purposeMatch =
      filters.purpose === "All" ||
      property.purpose.toLowerCase() === filters.purpose.toLowerCase();

    let budgetMatch = true;

    if (filters.budget === "Under 1 Cr") {
      budgetMatch = property.priceValue < 100;
    }

    if (filters.budget === "1 - 2 Cr") {
      budgetMatch = property.priceValue >= 100 && property.priceValue <= 200;
    }

    if (filters.budget === "Above 2 Cr") {
      budgetMatch = property.priceValue > 200;
    }

    return locationMatch && typeMatch && purposeMatch && budgetMatch;
  });
    
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.requirement) {
      newErrors.requirement = "Please select a requirement.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      phone: "",
      requirement: "",
      message: "",
    });

    setErrors({});
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  // Opens WhatsApp with a property-specific pre-filled enquiry message.
  const handleWhatsAppEnquiry = (property) => {
    const phoneNumber = "919876543210";

    const message = `Hi Havenstone Realty,

I'm interested in ${property.name} in ${property.location}.

Property Type: ${property.type}
Purpose: ${property.purpose}
Price: ${property.price}

Please share more details about this property.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo" onClick={closeMobileMenu}>
            <div className="logo-mark">
              <Home size={20} strokeWidth={2.2} />
            </div>

            <div>
              <div className="logo-name">Havenstone</div>
              <div className="logo-subtitle">REALTY</div>
            </div>
          </a>

          <nav className={`nav-menu ${mobileMenu ? "active" : ""}`}>
            <a href="#home" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="#properties" onClick={closeMobileMenu}>
              Properties
            </a>
            <a href="#services" onClick={closeMobileMenu}>
              Services
            </a>
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>
            <a href="#contact" onClick={closeMobileMenu}>
              Contact
            </a>

            <a
              href="#properties"
              className="nav-cta mobile-cta"
              onClick={closeMobileMenu}
            >
              Explore Properties
              <ArrowRight size={16} />
            </a>
          </nav>

          <a href="#properties" className="nav-cta desktop-cta">
            Explore Properties
            <ArrowRight size={16} />
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}

        <section className="hero" id="home">
          <div className="hero-overlay"></div>

          <div className="container hero-container">
            <div className="hero-content">
              <div className="eyebrow">
                <span></span>
                FIND YOUR NEXT ADDRESS
              </div>

              <h1>
                Find a place you'll be
                <span> proud to call home.</span>
              </h1>

              <p>
                Discover thoughtfully selected homes, apartments and
                commercial spaces in locations that matter.
              </p>

              <div className="hero-buttons">
                <a href="#properties" className="btn btn-primary">
                  Explore Properties
                  <ArrowRight size={18} />
                </a>

                <a href="#contact" className="btn btn-outline">
                  Contact Us
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <strong>500+</strong>
                  <span>Properties</span>
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  <strong>12+</strong>
                  <span>Cities</span>
                </div>

                <div className="trust-divider"></div>

                <div className="trust-item">
                  <strong>4.9/5</strong>
                  <span>Client Rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={18} />
          </div>
        </section>

        {/* ================= SEARCH ================= */}

        <section className="search-section">
          <div className="container">
            <div className="search-box">
              <div className="search-heading">
                <div className="search-icon">
                  <Search size={21} />
                </div>

                <div>
                  <h3>Find your perfect property</h3>
                  <p>Search from our curated collection</p>
                </div>
              </div>

              <div className="search-fields">
                <div className="select-wrapper">
                  <label>Location</label>
                  <select
                    className="search-select"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                  >
                    <option>All</option>
                    <option>Delhi</option>
                    <option>Gurgaon</option>
                    <option>Noida</option>
                  </select>
                  <ChevronDown size={16} />
                </div>

                <div className="select-wrapper">
                  <label>Property Type</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option>All</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                  <ChevronDown size={16} />
                </div>

                <div className="select-wrapper">
                  <label>Purpose</label>
                  <select
                    name="purpose"
                    value={filters.purpose}
                    onChange={handleFilterChange}
                  >
                    <option>All</option>
                    <option>Buy</option>
                    <option>Rent</option>
                  </select>
                  <ChevronDown size={16} />
                </div>

                <div className="select-wrapper">
                  <label>Budget</label>
                  <select
                    name="budget"
                    value={filters.budget}
                    onChange={handleFilterChange}
                  >
                    <option>All</option>
                    <option>Under 1 Cr</option>
                    <option>1 - 2 Cr</option>
                    <option>Above 2 Cr</option>
                  </select>
                  <ChevronDown size={16} />
                </div>

                <a href="#properties" className="search-button">
                  <Search size={18} />
                  Search
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROPERTIES ================= */}

        <section className="section properties-section" id="properties">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="section-label">FEATURED PROPERTIES</div>
                <h2>Spaces worth <span>coming home to</span></h2>
              </div>

  
            </div>

            {filteredProperties.length > 0 ? (
              <div className="property-grid">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onView={() => setSelectedProperty(property)}
                    onWhatsApp={() => handleWhatsAppEnquiry(property)}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Search size={40} />
                <h3>No properties found</h3>
                <p>
                  Try changing your search filters to discover more
                  properties.
                </p>

                <button
                  onClick={() =>
                    setFilters({
                      location: "All",
                      type: "All",
                      purpose: "All",
                      budget: "All",
                    })
                  }
                  className="btn btn-dark"
                >
                  Clear Filters
                </button>
              </div>
            )}

           <div className="view-all-wrapper">
  <button
    className="text-link"
    type="button"
    onClick={() => {
      document.getElementById("properties")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
  >
    View all properties
    <ArrowRight size={17} />
  </button>
</div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}

        <section className="section services-section" id="services">
          <div className="container">
            <div className="center-heading">
              <div className="section-label">WHAT WE DO</div>
              <h2>Everything you need, <span>all in one place.</span></h2>
              <p className="footer-description">
                From finding your dream home to making a smart investment, our
                team is here to simplify every step.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <div className="service-card" key={service.title}>
                    <div className="service-number">0{index + 1}</div>

                    <div className="service-icon">
                      <Icon size={26} />
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <a href="#contact">
                      Learn more
                      <ArrowRight size={16} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}

        <section className="section why-section">
          <div className="container why-container">
            <div className="why-image">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                alt="Modern luxury interior"
              />

              <div className="experience-card">
                <Sparkles size={22} />
                <div>
                  <strong>15+ Years</strong>
                  <span>of local expertise</span>
                </div>
              </div>
            </div>

            <div className="why-content">
              <div className="section-label">WHY HAVENSTONE</div>

              <h2>
                More than property.
                <span> A better experience.</span>
              </h2>

              <p className="why-description">
                Property decisions are important. That's why we combine local
                expertise, carefully selected listings and genuine personal
                support to help you make confident choices.
              </p>

              <div className="benefits-grid">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div className="benefit" key={benefit.title}>
                      <div className="benefit-icon">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4>{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a href="#about" className="btn btn-dark">
                Discover our story
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section className="section about-section" id="about">
          <div className="container about-container">
            <div className="about-content">
              <div className="section-label">ABOUT HAVENSTONE</div>

              <h2>
                A better way to find
                <span> your next property.</span>
              </h2>

              <p>
                Havenstone Realty helps individuals, families and businesses
                find properties that match their needs, lifestyle and
                investment goals.
              </p>

              <p>
                Our approach combines local market knowledge, carefully
                selected properties and personalized support to make property
                decisions simpler.
              </p>

              <div className="about-stats">
                <div>
                  <strong>15+</strong>
                  <span>Years Experience</span>
                </div>

                <div>
                  <strong>2.5K+</strong>
                  <span>Happy Clients</span>
                </div>

                <div>
                  <strong>12+</strong>
                  <span>Cities Covered</span>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                alt="Beautiful modern house"
              />

              <div className="quote-card">
                <div className="quote-stars">
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                </div>

                <p>
                  "Havenstone made finding our new home feel effortless."
                </p>

                <span>— Priya & Arjun, Gurgaon</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="cta-section">
          <div className="cta-pattern"></div>

          <div className="container cta-container">
            <div>
              <div className="section-label light-label">LET'S GET STARTED</div>

              <h2>Ready to find your next property?</h2>

              <p>
                Tell us what you're looking for and our team will help you find
                the right opportunity.
              </p>
            </div>

            <a href="#contact" className="btn btn-light">
              Get in Touch
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ================= CONTACT ================= */}

        <section className="section contact-section" id="contact">
          <div className="container contact-container">
            <div className="contact-info">
              <div className="section-label">CONTACT US</div>

              <h2>Let's find the <span>right place for you.</span></h2>

              <p className="contact-intro">
                Have a property requirement or want to know more about a
                listing? We'd love to hear from you.
              </p>

              <div className="contact-details">
                <a href="mailto:hello@havenstonerealty.com">
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>

                  <div>
                    <span>Email us</span>
                    <strong>hello@havenstonerealty.com</strong>
                  </div>
                </a>

                <a href="tel:+919876543210">
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>

                  <div>
                    <span>Call us</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                </a>

                <div>
                  <div className="contact-icon">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <span>Visit us</span>
                    <strong>New Delhi, India</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <Check size={32} />
                  </div>

                  <h3>Thank you for reaching out!</h3>

                  <p>
                    Your enquiry has been received. Our team will get back to
                    you shortly.
                  </p>

                  <button
                    className="btn btn-dark"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <FormField
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      error={errors.name}
                      onChange={handleFormChange}
                    />

                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      error={errors.email}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-row">
                    <FormField
                      label="Phone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      error={errors.phone}
                      onChange={handleFormChange}
                    />

                    <div className="form-group">
                      <label htmlFor="requirement">Requirement</label>

                      <select
                        id="requirement"
                        name="requirement"
                        value={form.requirement}
                        onChange={handleFormChange}
                      >
                        <option value="">Select requirement</option>
                        <option value="Buy a property">Buy a property</option>
                        <option value="Rent a property">
                          Rent a property
                        </option>
                        <option value="Sell a property">
                          Sell a property
                        </option>
                        <option value="Commercial property">
                          Commercial property
                        </option>
                        <option value="Property consultation">
                          Property consultation
                        </option>
                      </select>

                      {errors.requirement && (
                        <small>{errors.requirement}</small>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell us what you're looking for..."
                      value={form.message}
                      onChange={handleFormChange}
                    ></textarea>

                    {errors.message && <small>{errors.message}</small>}
                  </div>

                  <button type="submit" className="btn btn-dark form-submit">
                    Submit Enquiry
                    <ArrowRight size={18} />
                  </button>

                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" className="logo footer-logo">
                <div className="logo-mark">
                  <Home size={20} />
                </div>

                <div>
                  <div className="logo-name">Havenstone</div>
                  <div className="logo-subtitle">REALTY</div>
                </div>
              </a>

              <p>
                Helping you find places you'll be proud to call home, work and
                invest in.
              </p>

              <div className="social-links">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <span className="social-letter">ig</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <span className="social-letter">f</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <span className="social-letter">in</span>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Explore</h4>
              <a href="#home">Home</a>
              <a href="#properties">Properties</a>
              <a href="#services">Services</a>
              <a href="#about">About Us</a>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <a href="#services">Property Buying</a>
              <a href="#services">Property Selling</a>
              <a href="#services">Property Rentals</a>
              <a href="#services">Consultation</a>
            </div>

            <div className="footer-column footer-contact">
              <h4>Get in touch</h4>
              <a href="mailto:hello@havenstonerealty.com">
                hello@havenstonerealty.com
              </a>
              <a href="tel:+919876543210">+91 98765 43210</a>
              <span>New Delhi, India</span>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Havenstone Realty. All rights reserved.</span>

            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= WHATSAPP ================= */}

      <a
        className="whatsapp-btn"
        href="https://wa.me/919876543210?text=Hi%20Havenstone%20Realty,%20I%20would%20like%20to%20know%20more%20about%20your%20properties."
        target="_blank"
        rel="noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <Phone size={21} />
      </a>

      {/* ================= PROPERTY MODAL ================= */}

      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="property-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProperty(null)}
            >
              <X size={22} />
            </button>

            <div className="modal-image">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.name}
              />
            </div>

            <div className="modal-content">
              <div className="property-tags">
                <span>{selectedProperty.type}</span>
                <span>{selectedProperty.purpose}</span>
              </div>

              <h2>{selectedProperty.name}</h2>

              <p className="modal-location">
                <MapPin size={16} />
                {selectedProperty.location}
              </p>

              <div className="modal-price">{selectedProperty.price}</div>

              <p>{selectedProperty.description}</p>

              <div className="modal-specs">
                {selectedProperty.bedrooms && (
                  <div>
                    <BedDouble size={18} />
                    <span>
                      {selectedProperty.bedrooms} Bedrooms
                    </span>
                  </div>
                )}

                {selectedProperty.bathrooms && (
                  <div>
                    <Bath size={18} />
                    <span>
                      {selectedProperty.bathrooms} Bathrooms
                    </span>
                  </div>
                )}

                <div>
                  <Building2 size={18} />
                  <span>{selectedProperty.area}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-dark modal-btn"
                onClick={() => handleWhatsAppEnquiry(selectedProperty)}
              >
                Enquire on WhatsApp
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PropertyCard({ property, onView, onWhatsApp }) {
  return (
    <article className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.name} />

        <div className="property-badge">{property.purpose}</div>

        <button className="property-arrow" onClick={onView}>
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="property-content">
        <div className="property-meta">
          <span>{property.type}</span>
          <span>•</span>
          <span>{property.location}</span>
        </div>

        <h3>{property.name}</h3>

        <div className="property-details">
          {property.bedrooms && (
            <span>
              <BedDouble size={16} />
              {property.bedrooms} Beds
            </span>
          )}

          {property.bathrooms && (
            <span>
              <Bath size={16} />
              {property.bathrooms} Baths
            </span>
          )}

          <span>
            <Building2 size={16} />
            {property.area}
          </span>
        </div>

        <div className="property-bottom">
          <div>
            <small>Starting from</small>
            <strong>{property.price}</strong>
          </div>

          <button onClick={onWhatsApp}>
            Enquire on WhatsApp
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <small>{error}</small>}
    </div>
  );
}

export default App;