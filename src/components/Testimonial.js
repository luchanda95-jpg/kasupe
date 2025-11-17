// src/components/Testimonials.js
import "./Testimonials.css";
import { assets } from "../assets/assets";

function Testimonials() {
  const { testimonial_image_1, testimonial_image_2, star_icon } = assets;

  const testimonials = [
    {
      id: 1,
      name: "Chanda Mwika",
      role: "Business Traveler",
      text:
        "Kasupe made my trip from Lusaka to Chipata super smooth. The car was clean, the driver was on time and the pricing was very fair.",
      image: testimonial_image_1,
      trip: "Lusaka → Chipata",
    },
    {
      id: 2,
      name: "Ruth Banda",
      role: "Event Planner",
      text:
        "I book cars for clients almost every weekend. With Kasupe I don’t worry about reliability – they always show up, even for last-minute runs.",
      image: testimonial_image_2,
      trip: "Local runs in Chipata",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-header">
          <h2>What our customers say</h2>
          <p>
            Real experiences from passengers and car owners who use Kasupe
            every week.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <article
              key={item.id}
              className={`testimonial-card testimonial-card-${
                index + 1
              }`}
            >
              <div className="testimonial-top">
                <div className="testimonial-avatar-wrap">
                  <img
                    src={item.image}
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
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={i}
                    src={star_icon}
                    alt="star"
                    className="testimonial-star"
                  />
                ))}
                <span className="testimonial-rating-text">5.0</span>
              </div>

              <p className="testimonial-text">“{item.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
