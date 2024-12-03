import React, { createContext, useReducer, useEffect, ReactNode } from "react";

// Define User Type
interface User {
  user_id: string;
  username: string;
  telegram_id: string;
  os_id: string;
}

// Define State and Action Types
interface State {
  user: User | null;
}

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

// Create Context Types
interface ContextProps extends State {
  dispatch: React.Dispatch<Action>;
}

// Create Context
export const UserContext = createContext<ContextProps | undefined>(undefined);

// Reducer Function
const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// UserContextProvider Component
export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: JSON.parse(localStorage.getItem("user") || "null"),
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
