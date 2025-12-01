import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BlogDetails.css";

const API_BASE = "https://kasuper-server.onrender.com";

// helper: support both Mongo _id and local demo id
const getId = (post) => post._id || post.id;

// image helper – handles relative paths and full URLs
const getBlogImageUrl = (post) => {
  if (!post || !post.image) {
    return "https://via.placeholder.com/900x500?text=Kasupe+Blog";
  }

  const img = post.image;
  // if already a full http/https URL, just use it
  if (img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }

  // otherwise treat it as relative (e.g. /uploads/blogs/...)
  return `${API_BASE}${img}`;
};

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const fetchPostAndRelated = async () => {
      try {
        if (!isMounted) return;
        setError("");

        // 1) Fetch the main post
        if (isMounted) setLoading(true);
        const res = await fetch(`${API_BASE}/api/blogs/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Blog post not found.");
          } else {
            throw new Error("Failed to load blog post.");
          }
        }
        const postData = await res.json();
        if (!isMounted) return;
        setPost(postData);

        // 2) Fetch all posts to build "recommended" slider
        const resAll = await fetch(`${API_BASE}/api/blogs`);
        if (resAll.ok) {
          const all = await resAll.json();
          if (!isMounted) return;

          const others = (Array.isArray(all) ? all : []).filter(
            (p) => getId(p) !== getId(postData)
          );

          // ✅ NO SLICE – use ALL other posts in the slider
          setRelatedPosts(others);
          // reset slider index when list changes
          setRelatedIndex(0);
        } else {
          if (isMounted) setRelatedPosts([]);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            err.message ||
              "Could not load blog details. Please try again later."
          );
          setPost(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // initial load
    fetchPostAndRelated();

    // 🔁 refresh every 30 seconds
    const intervalId = setInterval(fetchPostAndRelated, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [id]);

  const handleLike = () => setLiked((prev) => !prev);

  const goBack = () => navigate(-1);

  if (loading) {
    return (
      <section className="blog-details-section">
        <div className="blog-details-inner">
          <button className="blog-back-btn" onClick={goBack}>
            ← Back to previous page
          </button>
          <p>Loading article...</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-details-section">
        <div className="blog-details-inner">
          <button className="blog-back-btn" onClick={goBack}>
            ← Back to previous page
          </button>
          <p style={{ color: "#b91c1c" }}>{error || "Blog post not found."}</p>
        </div>
      </section>
    );
  }

  const imageSrc = getBlogImageUrl(post);

  const contentParagraphs = Array.isArray(post.content)
    ? post.content
    : typeof post.content === "string"
    ? [post.content]
    : [];

  return (
    <section className="blog-details-section">
      <div className="blog-details-inner">
        {/* Back button */}
        <button className="blog-back-btn" onClick={goBack}>
          ← Back to previous page
        </button>

        {/* Meta row */}
        <div className="blog-details-tag-row">
          {post.tag && <span className="blog-details-tag">{post.tag}</span>}
          {(post.tag || post.date) && (
            <span className="blog-details-dot">•</span>
          )}
          {post.date && (
            <span className="blog-details-date">{post.date}</span>
          )}
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
            src={imageSrc}
            alt={post.title}
            className="blog-details-hero-image"
          />
        </div>

        {/* Content paragraphs */}
        <div className="blog-details-content">
          {contentParagraphs.map((para, index) => (
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
                window.location.href = "mailto:bookings@kasupecarhire.com";
              }}
            >
              Consult about tours & travel
            </button>
          </div>

          {/* Recommended reads – SLIDER with dots, all posts */}
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
                  {relatedPosts.map((rp) => {
                    const rId = getId(rp);
                    const rImg = getBlogImageUrl(rp);

                    return (
                      <article
                        key={rId}
                        className="blog-related-slide"
                        onClick={() => navigate(`/blog/${rId}`)}
                      >
                        <div className="blog-related-card">
                          <div className="blog-related-image-wrap">
                            <img
                              src={rImg}
                              alt={rp.title}
                              className="blog-related-image"
                            />
                          </div>
                          <div className="blog-related-body">
                            <p className="blog-related-tag-date">
                              {rp.tag && <span>{rp.tag}</span>}
                              {rp.tag && rp.date && " · "}
                              {rp.date && <span>{rp.date}</span>}
                            </p>
                            <h4 className="blog-related-title">
                              {rp.title}
                            </h4>
                          </div>
                        </div>
                      </article>
                    );
                  })}
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
