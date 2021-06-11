const CREATE_COMMENT = "comments/CREATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const LOAD = 'comments/LOAD';

const load = list => ({
  type: LOAD,
  list,
});

const createComment = (comment, instrumentId) => ({
  type: CREATE_COMMENT,
  comment,
  instrumentId
});

const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
});

export const getAllComments = () => async (dispatch) => {
  const response = await fetch("/api/comments/all");
  if (response.ok) {
    const data = await response.json();
    const list = data.comments;
    dispatch(load(list));
  }
};

export const createNewComment = (comment, instrumentId) => async (dispatch) => {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      instrument_id: instrumentId,
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(createComment(data))
  return {};
};

export const editComment = (id, comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(createComment(data))
  return {};
};

export const deleteAComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(deleteComment(id))
  return {};
};

const initialState = { list: [] };

export default function commentsReducer(state=initialState, action) {
  switch (action.type) {
    case LOAD:
      const allComments = {};
      action.list.forEach(comment => {
        allComments[comment.id] = comment;
      });
      return {
        ...state,
        ...allComments,
        list: [...action.list]
      }
    case CREATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment,
        list: [...state.list, action.comment]
      }
    case DELETE_COMMENT:
      let newComments = { ...state };
      delete newComments[action.id];
      return {
        ...newComments,
        list: [...state.list.filter(comment => comment.id !== action.id)]
      }
    default:
      return state
  }
}
