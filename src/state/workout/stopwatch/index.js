import initialState from './initial.state';

// Action types
export const SET_STOPWATCH_ACTIVE = 'SET_STOPWATCH_ACTIVE';
export const ADD_STOPWATCH_LAP = 'ADD_STOPWATCH_LAP';
export const CLEAR_STOPWATCH_LAPS = 'CLEAR_STOPWATCH_LAPS';

// Action creators
export const setStopwatchActive = active => ({
  type: SET_STOPWATCH_ACTIVE,
  active
});

export const addStopwatchLap = lap => ({
  type: ADD_STOPWATCH_LAP,
  lap
});

export const clearStopwatchLaps = () => ({
  type: CLEAR_STOPWATCH_LAPS
});

// Selectors
export const getStopwatchActive = state => state.workout.stopwatch.active;
export const getStopwatchLaps = state => state.workout.stopwatch.laps;

// Reducers
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STOPWATCH_ACTIVE:
      return {
        ...state,
        active: action.active
      };
    case ADD_STOPWATCH_LAP:
      return {
        ...state,
        laps: [...state.laps, action.lap]
      };
    case CLEAR_STOPWATCH_LAPS:
      return {
        ...state,
        laps: []
      };
    default:
      return state;
  }
};