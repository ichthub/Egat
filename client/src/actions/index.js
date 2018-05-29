import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
export const submitSurvey = (vlaues, history) => async dispatch => {
  const res = await axios.post('/api/surveys', vlaues);
  history.push('/');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({
    type: FETCH_SURVEYS,
    payload: res.data
  });
};
