"use client"
import { createContext, useContext, useReducer, ReactElement, Dispatch } from 'react';

type actionClass = ('changeNamespace' | 'setFilterString' | 'clearFilterString' | null)
type Action =  {
  type: actionClass,
  namespace?: string,
  filterString?: string | null
};
const defaultState = { namespace: '', filterString: '' };
type StateType = typeof defaultState;

export const AppContext = createContext<StateType|null>(null);
export const AppDispatchContext = createContext<Dispatch<Action>|null>(null);

const appContextReducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case ('changeNamespace'): {
      return {...state, namespace: action.namespace!};
    }
    case ('setFilterString'): {
      console.log('Filter string: ', action.filterString)
      return {...state, filterString: action.filterString!};
    }
    default: {
      return state;
    }
  }
}

export function StateProvider({ children }: {children: ReactElement | ReactElement[]}) {

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