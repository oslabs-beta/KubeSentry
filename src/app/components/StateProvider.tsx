"use client"
import { createContext, useContext, useReducer, ReactElement, Dispatch } from 'react';

type actionClass = ('changeNamespace' | null)
type actionType =  {type: actionClass, payload: any};
interface StateType {namespace: string};


export const AppContext = createContext<StateType|null>(null);
export const AppDispatchContext = createContext<Dispatch<actionType>|null>(null);

const appContextReducer = (state: StateType, action: actionType) => {
  switch (action.type) {
    case ('changeNamespace'): {
      return {...state, namespace: action.payload};
    }
    default: {
      return state;
    }
  }
}

export function StateProvider({ children }: {children: ReactElement | ReactElement[]}) {

  const defaultState = {namespace: ''};
  const [appState, dispatch] = useReducer(appContextReducer, defaultState);
  return (
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}