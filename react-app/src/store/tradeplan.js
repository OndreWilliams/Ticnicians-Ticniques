const CREATE_TP = "tradeplan/CREATE_TP";

const createTP = (tradeplan) => ({
  type: CREATE_TP,
  payload: tradeplan
});

export const createTradeplan = (title, imageUrl, description, makePublic) => async (dispatch) => {
  const response = await fetch('/api/tradeplan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      imageUrl,
      description,
      makePublic
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(createTP(data))
  return {};
};

const initialState = { tradeplans: null };

export default function tradeplanReducer(state=initialState, {type, payload}) {
  switch (type) {
    case CREATE_TP:
      return {
        ...state,
        tradeplans: {
          ...state.tradeplans,
          payload,
        }
      }

    default:
      return state
  }
}
