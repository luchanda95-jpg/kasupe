import "./BlogSection.css";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

function BlogSection() {
  const navigate = useNavigate();

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

        <div className="blog-masonry-grid">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-masonry-card"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="blog-masonry-image-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-masonry-image"
                />
                <span className="blog-masonry-tag">{post.tag}</span>
              </div>

              <div className="blog-masonry-body">
                <p className="blog-masonry-date">{post.date}</p>
                <h3 className="blog-masonry-title">{post.title}</h3>
                <p className="blog-masonry-excerpt">{post.excerpt}</p>

                <button
                  className="blog-masonry-readmore"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent double navigation
                    navigate(`/blog/${post.id}`);
                  }}
                >
                  Read more <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
