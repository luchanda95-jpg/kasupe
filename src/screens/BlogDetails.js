// src/screens/BlogDetails.js
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BlogDetails.css";
import { getBlogPostById, blogPosts } from "../data/blogPosts";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [relatedIndex, setRelatedIndex] = useState(0);

  const post = getBlogPostById(id);

  if (!post) {
    return (
      <section className="blog-details-section">
        <div className="blog-details-inner">
          <button className="blog-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p>Blog post not found.</p>
        </div>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <section className="blog-details-section">
      <div className="blog-details-inner">
        {/* Back button */}
        <button className="blog-back-btn" onClick={() => navigate(-1)}>
          ← Back to previous page
        </button>

        {/* Meta row */}
        <div className="blog-details-tag-row">
          <span className="blog-details-tag">{post.tag}</span>
          <span className="blog-details-dot">•</span>
          <span className="blog-details-date">{post.date}</span>
          {post.readingTime && (
            <>
              <span className="blog-details-dot">•</span>
              <span className="blog-details-reading">{post.readingTime}</span>
            </>
          )}
        </div>

        {/* Title + author */}
        <h1 className="blog-details-title">{post.title}</h1>

        {post.author && (
          <p className="blog-details-author">By {post.author}</p>
        )}

        {/* Hero image */}
        <div className="blog-details-hero-wrap">
          <img
            src={post.image}
            alt={post.title}
            className="blog-details-hero-image"
          />
        </div>

        {/* Content paragraphs */}
        <div className="blog-details-content">
          {post.content.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        {/* Bottom area: actions + consult card + related slider */}
        <div className="blog-details-bottom">
          {/* Like / share / hire row */}
          <div className="blog-details-actions">
            <div className="blog-actions-left">
              <button
                type="button"
                className={`blog-like-btn ${liked ? "liked" : ""}`}
                onClick={handleLike}
              >
                {liked ? "♥ Liked this article" : "♡ Like this article"}
              </button>

              <button
                type="button"
                className="blog-share-btn"
                onClick={() => {
                  if (navigator.clipboard && window.location) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard");
                  }
                }}
              >
                ↗ Share
              </button>
            </div>

            {/* Hire a vehicle – goes to /cars */}
            <button
              type="button"
              className="blog-hire-btn"
              onClick={() => navigate("/cars")}
            >
              Hire a vehicle
            </button>
          </div>

          {/* Consult CTA */}
          <div className="blog-consult-card">
            <h3>Plan your next trip with us</h3>
            <p>
              Need help choosing a car, planning a route or estimating fuel and
              travel time? Our team can guide you.
            </p>
            <ul>
              <li>Custom route suggestions for Zambia trips</li>
              <li>Help picking the right vehicle for your journey</li>
              <li>Basic cost estimates for fuel and tolls</li>
            </ul>
            <button
              type="button"
              className="blog-consult-btn"
              onClick={() => {
                // You can later swap this for a /contact page or WhatsApp link
                window.location.href = "mailto:bookings@kasupecarhire.com";
              }}
            >
              Consult about tours & travel
            </button>
          </div>

          {/* Recommended reads – slider with dots */}
          {relatedPosts.length > 0 && (
            <div className="blog-related-section">
              <h3>Recommended reads</h3>

              <div className="blog-related-slider">
                <div
                  className="blog-related-track"
                  style={{
                    transform: `translateX(-${relatedIndex * 100}%)`,
                  }}
                >
                  {relatedPosts.map((rp) => (
                    <article
                      key={rp.id}
                      className="blog-related-slide"
                      onClick={() => navigate(`/blog/${rp.id}`)}
                    >
                      <div className="blog-related-card">
                        <div className="blog-related-image-wrap">
                          <img
                            src={rp.image}
                            alt={rp.title}
                            className="blog-related-image"
                          />
                        </div>
                        <div className="blog-related-body">
                          <p className="blog-related-tag-date">
                            <span>{rp.tag}</span> · <span>{rp.date}</span>
                          </p>
                          <h4 className="blog-related-title">
                            {rp.title}
                          </h4>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="blog-related-dots">
                {relatedPosts.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`blog-related-dot ${
                      idx === relatedIndex ? "active" : ""
                    }`}
                    onClick={() => setRelatedIndex(idx)}
                    aria-label={`View recommended article ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
