const CREATE_TP = "tradeplan/CREATE_TP";
const DELETE_TP = "tradeplan/DELETE_TP";
const LOAD = 'tradeplan/LOAD';

const load = list => ({
  type: LOAD,
  list,
});

const createTP = (tradeplan) => ({
  type: CREATE_TP,
  tradeplan
});

const deleteTP = (id) => ({
  type: DELETE_TP,
  id
});

export const getOneTradeplan = (id) => async (dispatch) => {
  const response = await fetch(`/api/tradeplan/${id}`);
  if (response.ok){
    const data = await response.json();
    dispatch(load([data]));
  }
};

export const getAllTradeplans = () => async (dispatch) => {
  const response = await fetch("/api/tradeplan/all");
  if (response.ok) {
    const data = await response.json();
    const list = data.tradeplans;
    dispatch(load(list));
  }
};

export const createTradeplan = (instrumentId, title, imageUrl, description, makePublic) => async (dispatch) => {
  const response = await fetch('/api/tradeplan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instrument_id: instrumentId,
      title,
      image: imageUrl,
      description,
      public: makePublic
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(createTP(data))
  return {};
};

export const editTradeplan = (id, instrumentId, title, imageUrl, description, makePublic) => async (dispatch) => {
  const response = await fetch(`/api/tradeplan/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instrument_id: instrumentId,
      title,
      image: imageUrl,
      description,
      public: makePublic
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(createTP(data))
  return {};
};

export const deleteTradeplan = (id) => async (dispatch) => {
  const response = await fetch(`/api/tradeplan/${id}`, {
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

  dispatch(deleteTP(id))
  return {};
};

const initialState = { list: [] };

export default function tradeplanReducer(state=initialState, action) {
  switch (action.type) {
    case LOAD:
      const allTradeplans = {};
      action.list.forEach(tradeplan => {
        allTradeplans[tradeplan.id] = tradeplan;
      });
      return {
        ...state,
        ...allTradeplans,
        list: [...action.list]

      }

    case CREATE_TP:
      return {
        ...state,
        [action.tradeplan.id]: action.tradeplan,
        list: [...state.list, action.tradeplan]
      }

    case DELETE_TP:
      let newTradeplans = { ...state };
      delete newTradeplans[action.id];
      return {
        ...newTradeplans,
        list: [...state.list.filter(tradeplan => tradeplan.id !== action.id)]
      }

    default:
      return state
  }
}
