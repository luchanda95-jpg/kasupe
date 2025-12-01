// src/components/BlogSection.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogSection.css";

const API_BASE = "https://kasuper-server.onrender.com";

const placeholderBlogImg =
  "https://via.placeholder.com/600x400?text=Kasupe+Blog";

// helper: support both Mongo _id and local demo id
const getId = (post) => post._id || post.id;

// helper: normalize blog image URL
const getBlogImageUrl = (post) => {
  if (!post || !post.image) return placeholderBlogImg;

  const img = post.image;

  // already a full URL
  if (typeof img === "string" && img.startsWith("http")) {
    return img;
  }

  // relative like "/uploads/blogs/..."
  if (typeof img === "string" && img.startsWith("/")) {
    return `${API_BASE}${img}`;
  }

  // bare "uploads/blogs/..."
  return `${API_BASE}/${img.replace(/^\/+/, "")}`;
};

function BlogSection() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let isFirst = true;

    const fetchPosts = async () => {
      try {
        if (isFirst) {
          setLoading(true);
          setError("");
        }

        const res = await fetch(`${API_BASE}/api/blogs`);
        if (!res.ok) {
          throw new Error("Failed to load blog posts.");
        }

        const data = await res.json();
        if (isMounted) {
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Could not load blog posts. Please try again later.");
        }
      } finally {
        if (isMounted && isFirst) {
          setLoading(false);
          isFirst = false;
        }
      }
    };

    // initial load
    fetchPosts();

    // 🔁 auto-refresh every 30 seconds
    const intervalId = setInterval(fetchPosts, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
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
              const imageSrc = getBlogImageUrl(post);

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
                    <p className="blog-masonry-date">{post.date || ""}</p>
                    <h3 className="blog-masonry-title">{post.title}</h3>
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
