import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;
  // Note: These below are for multiple choice questions
  // Note: We need to track which option is being edited and the draft text
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);
  const [optionDraft, setOptionDraft] = useState('');

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    console.log('TODO: Implement edit functionality');
    // Hint: Use SET_EDITING_QUESTION action
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: isEditing ? null : question.id,
      },
    });
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    console.log('TODO: Implement save functionality');
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });
    // close the form after saving the question text
    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: null,
      },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    console.log('TODO: Implement delete functionality');
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );
    if (confirmed) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: {
          id: question.id,
        },
      });
    }
  };

  // Note: These below functions are for multiple choice questions only

  // opens inline option and pre-fills optionDraft with its current text
  const handleEditOption = (index) => {
    setEditingOptionIndex(index);
    setOptionDraft(question.options[index]);
  };

  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: optionDraft,
      },
    });
    setEditingOptionIndex(null);
    setOptionDraft('');
  };

  const handleDeleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });
  };

  const handleAddOption = () => {
    const text = prompt('+ Add Option ');
    if (text?.trim()) {
      dispatch({
        type: 'ADD_OPTION_TO_QUESTION',
        payload: {
          questionId: question.id,
          optionText: text.trim(),
        },
      });
      setOptionDraft('');
    }
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}

          {/* Note: QuestionItem is rendered once per question in QuestionList 
          (using a .map()), so there are many QuestionItem instances on screen, 
          each with its own question prop and therefore its own question.id */}
          <button className={styles['edit-btn']} onClick={handleEdit}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      <div className={styles['question-content']}>
        {isEditing ? (
          <>
            <input
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />
            <button onClick={handleSave} className={styles['save-btn']}>
              Save
            </button>
            <button onClick={handleEdit} className={styles['cancel-btn']}>
              Cancel
            </button>
          </>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {editingOptionIndex === index ? (
                  <div>
                    <input
                      value={optionDraft}
                      onChange={(e) => setOptionDraft(e.target.value)}
                    />
                    <button
                      onClick={() => handleSaveOption(index)}
                      className={styles['save-btn']}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingOptionIndex(null)}
                      className={styles['cancel-btn']}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className={styles['option-text']}>{option}</span>
                    <button
                      onClick={() => handleEditOption(index)}
                      className={styles['option-edit-btn']}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOption(index)}
                      disabled={question.options.length <= 2}
                      className={styles['option-delete-btn']}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddOption}
            className={styles['add-option-btn']}
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}
