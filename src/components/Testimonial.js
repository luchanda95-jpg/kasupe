// src/components/Testimonials.js
import { useEffect, useState } from "react";
import "./Testimonials.css";
import { assets } from "../assets/assets";

const API_BASE = "https://kasuper-server.onrender.com";

// Demo fallback (keep OUTSIDE component to avoid re-render loops)
const demoTestimonials = [
  {
    _id: "demo1",
    name: "Chanda Mwika",
    role: "Business Traveler",
    text:
      "Kasupe made my trip from Lusaka to Chipata super smooth. The car was clean, the driver was on time and the pricing was very fair.",
    image: assets.testimonial_image_1,
    trip: "Lusaka → Chipata",
    rating: 5,
  },
  {
    _id: "demo2",
    name: "Ruth Banda",
    role: "Event Planner",
    text:
      "I book cars for clients almost every weekend. With Kasupe I don’t worry about reliability – they always show up, even for last-minute runs.",
    image: assets.testimonial_image_2,
    trip: "Local runs in Chipata",
    rating: 5,
  },
];

function Testimonials() {
  const { star_icon } = assets;

  const [testimonials, setTestimonials] = useState([]);
  const [usingDemo, setUsingDemo] = useState(false);

  // ✅ Convert stored path to a usable browser URL
  const resolveImage = (img) => {
    if (!img) return "https://via.placeholder.com/90x90?text=User";
    if (img.startsWith("http")) return img;          // full URL already OK
    if (img.startsWith("/uploads")) return API_BASE + img; // server uploads
    return API_BASE + "/" + img.replace(/^\/+/, ""); // any other relative path
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/testimonials`);
        if (!res.ok) throw new Error("API not ready");

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        setTestimonials(list);
        setUsingDemo(false);
      } catch (err) {
        console.warn("Testimonials API offline, using demo.", err);
        setTestimonials(demoTestimonials);
        setUsingDemo(true);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-header">
          <h2>What our customers say</h2>
          <p>
            Real experiences from passengers and car owners who use Kasupe
            every week.
          </p>
          {usingDemo && (
            <small style={{ color: "#6b7280" }}>
              (Demo testimonials – API offline)
            </small>
          )}
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => {
            const rating = Number(item.rating || 5);

            return (
              <article
                key={item._id || item.id || index}
                className={`testimonial-card testimonial-card-${index + 1}`}
              >
                <div className="testimonial-top">
                  <div className="testimonial-avatar-wrap">
                    <img
                      src={resolveImage(item.image || item.imageUrl || item.photo)}
                      alt={item.name}
                      className="testimonial-avatar"
                    />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="testimonial-role">{item.role}</p>
                    <p className="testimonial-trip">{item.trip}</p>
                  </div>
                </div>

                <div className="testimonial-rating">
                  {Array.from({ length: rating }).map((_, i) => (
                    <img
                      key={i}
                      src={star_icon}
                      alt="star"
                      className="testimonial-star"
                    />
                  ))}
                  <span className="testimonial-rating-text">
                    {rating.toFixed(1)}
                  </span>
                </div>

                <p className="testimonial-text">“{item.text}”</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
