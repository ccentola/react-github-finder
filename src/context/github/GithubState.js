import React, { useReducer } from 'react';
// import axios from 'axios';
// import github from '../../api/github';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types';

let githubToken;

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubToken = process.env.GITHUB_TOKEN;
}

const github = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: githubToken,
  },
});

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // search users
  const searchUsers = async (text) => {
    setLoading();
    const res = await github.get(
      `/search/users?q=${text}`
      //   `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };
  // get user
  const getUser = async (username) => {
    setLoading();
    const res = await github.get(`/users/${username}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // get repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await github.get(
      `/users/${username}/repos?per_page=5&sort=created:asc;`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
