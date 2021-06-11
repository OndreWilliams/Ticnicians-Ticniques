// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const REMOVE_USER_TP = "session/REMOVE_USER_TP"

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
});

const removeUserTradeplan = (id) => ({
  type: REMOVE_USER_TP,
  id
});

const initialState = { user: null };

export const removeUserTP = (id) => (dispatch) => {
  dispatch(removeUserTradeplan(id));
};

export const getSelf = () => async (dispatch) => {
  const response = await fetch('/api/users/me',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (data.errors) {
      return;
  }

  dispatch(setUser(data))
}

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }

    dispatch(setUser(data))
  }

  export const login = (email, password) => async (dispatch)  => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setUser(data))
    return {};
  }

  export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    dispatch(removeUser());
  };


  export const signUp = (username, email, password) => async (dispatch)  => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setUser(data))
    return {};
  }

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
              ...state,
              user: action.payload
            }
        case REMOVE_USER:
            return {
              ...state,
              user: null
            }

        case REMOVE_USER_TP:
            let tempUser = {...state.user};
            delete tempUser.tradeplans[Number(action.id)];
            console.log("************************")
            console.log(tempUser)
            console.log("************************")

          return {
            ...state,
            user: {...tempUser}
          }
        default:
            return state;
    }
}
