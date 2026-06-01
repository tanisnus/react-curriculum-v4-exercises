// Helper function to generate unique IDs
export const generateId = () =>
  `q${Date.now()}${Math.random().toString(36).substring(2, 11)}`;

// Question type constants
export const QUESTION_TYPES = {
  TEXT: 'text',
  MULTIPLE_CHOICE: 'multiple-choice',
  YES_NO: 'yes-no',
  RATING: 'rating',
};

// Question type display labels
export const QUESTION_TYPE_LABELS = {
  [QUESTION_TYPES.TEXT]: 'Text Question',
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 'Multiple Choice',
  [QUESTION_TYPES.YES_NO]: 'Yes/No',
  [QUESTION_TYPES.RATING]: 'Rating',
};

// Default question options for multiple choice
export const DEFAULT_MULTIPLE_CHOICE_OPTIONS = ['Option A'];

// Factory function to create new questions
//https://javascript.plainenglish.io/chapter-51-mastering-factory-functions-in-javascript-the-ultimate-guide-379bc2006895
const createNewQuestion = (payload, questionsLength) => ({
  id: generateId(),
  type: payload.type || QUESTION_TYPES.TEXT,
  question: payload.question || 'New Question',
  required: true,
  order: questionsLength,
  options:
    payload.options ||
    (payload.type === QUESTION_TYPES.MULTIPLE_CHOICE
      ? DEFAULT_MULTIPLE_CHOICE_OPTIONS
      : []),
});

export function surveyReducer(state, action) {
  switch (action.type) {
    // ===== MVP ACTIONS (ALREADY WORKING) =====

    case 'ADD_QUESTION':
      return {
        ...state,
        questions: [
          ...state.questions,
          createNewQuestion(action.payload, state.questions.length),
        ],
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    case 'ADD_OPTION':
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId
            ? { ...q, options: [...q.options, action.payload.option] }
            : q
        ),
      };

    case 'SET_EDITING_QUESTION':
      return {
        ...state,
        ui: {
          ...state.ui,
          editingQuestionId: action.payload.questionId,
        },
      };

    case 'UPDATE_SURVEY_TITLE':
      return {
        ...state,
        survey: {
          ...state.survey,
          title: action.payload.title,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        ui: {
          ...state.ui,
          isPreviewMode: !state.ui.isPreviewMode,
          editingQuestionId: null, // Clear editing when switching modes
        },
      };
    // ===== END MVP ACTIONS =========
    // ===== STUDENT IMPLEMENTATION TASKS =====

    case 'UPDATE_QUESTION_TEXT':
      // TODO: Implement this action
      console.log('TODO: Implement UPDATE_QUESTION_TEXT action');

      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.id
            ? { ...q, question: action.payload.newText }
            : q
        ),
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    case 'DELETE_QUESTION':
      // TODO: Implement this action
      console.log('TODO: Implement DELETE_QUESTION action');
      return {
        ...state,
        questions: state.questions.filter((q) => q.id !== action.payload.id),
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
        // if the question being edited is the one we're deleting, clear it;
        // otherwise keep it as-is."
        ui: {
          ...state.ui,
          editingQuestionId:
            state.ui.editingQuestionId === action.payload.id
              ? null
              : state.ui.editingQuestionId,
        },
      };

    case 'ADD_OPTION_TO_QUESTION':
      // only add the option to the question if it's a multiple-choice question
      // Note: Each question array in surveyData.js has "options" property that maps to an array of strings
      // Note: Each question array in surveyData.js has "type" property
      //       that indicates the type of question

      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId &&
          q.type === QUESTION_TYPES.MULTIPLE_CHOICE
            ? { ...q, options: [...q.options, action.payload.optionText] }
            : q
        ),
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    case 'UPDATE_OPTION_TEXT':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (
            q.id === action.payload.questionId &&
            q.type === QUESTION_TYPES.MULTIPLE_CHOICE
          ) {
            const updatedOptions = [...q.options];
            updatedOptions[action.payload.optionIndex] = action.payload.newText;
            return { ...q, options: updatedOptions };
          }
          return q;
        }),
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    case 'DELETE_OPTION_FROM_QUESTION':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (
            q.id === action.payload.questionId &&
            q.type === QUESTION_TYPES.MULTIPLE_CHOICE &&
            q.options.length > 2
          ) {
            const updatedOptions = q.options.filter(
              (_, index) => index !== action.payload.optionIndex
            );
            return { ...q, options: updatedOptions };
          }
          return q;
        }),
        survey: {
          ...state.survey,
          lastModified: new Date().toISOString().split('T')[0],
        },
      };

    default:
      return state;
  }
}
