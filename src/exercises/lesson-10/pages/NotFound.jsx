import { Link, useLocation } from 'react-router-dom';

const lessonBase = '/lessons/lesson-10';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        The path <code>{pathname}</code> is not valid.
      </p>
      <Link to={lessonBase}>Home</Link>
    </section>
  );
}
