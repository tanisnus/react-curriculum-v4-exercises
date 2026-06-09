import { useNavigate } from 'react-router-dom';

const lessonBase = '/lessons/lesson-10';
export default function Checkout() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate(lessonBase);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <section>
      <h2>Checkout</h2>
      <p>This page exists to practice useNavigate().</p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleGoHome}>Go Home</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </section>
  );
}
