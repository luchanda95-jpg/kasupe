// src/components/BlogSection.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogSection.css";

const API_BASE = "https://kasuper-server.onrender.com";

// helper: support both Mongo _id and local demo id
const getId = (post) => post._id || post.id;

function BlogSection() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/blogs`);
        if (!res.ok) {
          throw new Error("Failed to load blog posts.");
        }

        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="blog-masonry-section">
      <div className="blog-masonry-inner">
        <div className="blog-masonry-header">
          <h2>From the Kasupe blog</h2>
          <p>
            Safari routes, car hire tips and real stories to inspire your next
            trip.
          </p>
        </div>

        {loading && (
          <p className="blog-masonry-status">Loading blog articles...</p>
        )}

        {error && !loading && (
          <p className="blog-masonry-status" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="blog-masonry-status">
            No blog articles published yet.
          </p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="blog-masonry-grid">
            {posts.map((post) => {
              const id = getId(post);
              const imageSrc =
                post.image ||
                "https://via.placeholder.com/600x400?text=Kasupe+Blog";

              return (
                <article
                  key={id}
                  className="blog-masonry-card"
                  onClick={() => navigate(`/blog/${id}`)}
                >
                  <div className="blog-masonry-image-wrap">
                    <img
                      src={imageSrc}
                      alt={post.title}
                      className="blog-masonry-image"
                    />
                    {post.tag && (
                      <span className="blog-masonry-tag">{post.tag}</span>
                    )}
                  </div>

                  <div className="blog-masonry-body">
                    <p className="blog-masonry-date">
                      {post.date || ""}
                    </p>
                    <h3 className="blog-masonry-title">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="blog-masonry-excerpt">
                        {post.excerpt}
                      </p>
                    )}

                    <button
                      className="blog-masonry-readmore"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${id}`);
                      }}
                    >
                      Read more <span>→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogSection;
