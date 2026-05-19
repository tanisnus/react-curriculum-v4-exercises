import './Lesson07Styles.css';
import { getSinglePost } from './api';
import { useState } from 'react';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      // clears a previous error when the user clicks again
      setError(null);
      setLoading(true);
      const data = await getSinglePost(1);
      setPost(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={() => handleClick()}>
        Get post
      </button>

      <div className="content">
        {/* TODO: Replace me with fetched data when the <code>Get post</code> button
        is clicked */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : post ? (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ) : (
          // default message when the user hasn't clicked the button yet
          <p>Click &quot;Get post&quot; to load a post.</p>
        )}
      </div>
    </div>
  );
}
