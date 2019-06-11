import { createAction, handleActions } from 'redux-actions';

/**
 * INITIAL STATE
 */

export const initialState = {
  isDrawerOpened: true,
  isMobileDrawerOpened: false,
  isAppWaiting: false,
  notifications: []
};

/**
 * ACTION TYPES
 */

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_MOBILE_DRAWER = 'TOGGLE_MOBILE_DRAWER';

export const SET_APP_WAITING = 'SET_APP_WAITING';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_ALL_NOTIFICATION = 'REMOVE_ALL_NOTIFICATION';

/**
 * ACTION CREATORS
 */

export const toggleDrawer = createAction(
  TOGGLE_DRAWER
);
export const toggleMobileDrawer = createAction(
  TOGGLE_MOBILE_DRAWER
);

export const setAppWaiting = createAction(
  SET_APP_WAITING,
  waiting => waiting
);

export const addNotification = createAction(
  ADD_NOTIFICATION,
  (message, variant) => ({ message, variant })
);
export const removeNotification = createAction(
  REMOVE_NOTIFICATION,
  key => key
);
export const removeAllNotification = createAction(
  REMOVE_ALL_NOTIFICATION
);

/**
 * SELECTORS
 */

export const getIsDrawerOpened = state => state.app.isDrawerOpened;
export const getIsMobileDrawerOpened = state => state.app.isMobileDrawerOpened;
export const getIsAppWaiting = state => state.app.isAppWaiting;

/**
 * REDUCER
 */

export const reducer = handleActions(
  {
    [toggleDrawer]: state => ({ ...state, isDrawerOpened: !state.isDrawerOpened }),
    [toggleMobileDrawer]: state => ({ ...state, isMobileDrawerOpened: !state.isMobileDrawerOpened }),
    [setAppWaiting]: (state, { payload: waiting }) => ({ ...state, isAppWaiting: waiting }),
    [addNotification]: (state, { payload: { message, variant = 'information' } }) => ({
      ...state,
      notifications: [
        ...state.notifications,
        { key: new Date().getTime(), message, variant }
      ]
    }),
    [removeNotification]: (state, { payload: key }) => ({
      ...state,
      notifications: state.notifications.filter(notification => notification.key !== key)
    }),
    [removeAllNotification]: state => ({ ...state, notifications: [] })
  },
  initialState
);
