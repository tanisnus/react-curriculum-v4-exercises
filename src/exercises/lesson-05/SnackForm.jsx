import styles from './SnackForm.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
    } else {
      setName('');
      setRating('');
    }
    setTouched({ name: false, rating: false });
  }, [editingSnack]);

  function validateName() {
    // no mutating state, just returning a boolean
    return name.trim().length > 0;
  }

  function validateRating() {
    // check if rating is not empty and is a number between 1 and 5
    return rating !== '' && Number(rating) >= 1 && Number(rating) <= 5;
  }

  function getNameError() {
    if (touched.name && !validateName()) {
      return 'Snack name is required';
    }
    return '';
  }

  function getRatingError() {
    if (touched.rating && !validateRating()) {
      return 'Please select a rating';
    }
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateName() || !validateRating()) {
      setTouched({ name: true, rating: true });
      return;
    } else {
      if (isEditing) {
        updateSnack(editingSnack.id, name, rating);
      } else {
        addSnack(name, rating);
        setName('');
        setRating('');
        setTouched({ name: false, rating: false });
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {getNameError() && <div className={styles.error}>{getNameError()}</div>}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          value={rating}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {getRatingError() && (
          <div className={styles.error}>{getRatingError()}</div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
