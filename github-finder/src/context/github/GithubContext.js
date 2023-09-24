import { createContext, useReducer } from 'react'
import { Octokit } from '@octokit/core'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

// const GITHUB_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN4

const octokit = new Octokit({
  auth: `${GITHUB_TOKEN}`,
})

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get single user
  const getUser = async (login) => {
    setLoading()

    const { data } = await octokit.request(`GET /users/${login}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    // if (data.status === 404) {
    //   window.location = '/notfound'
    // } else {
    dispatch({
      type: 'GET_USER',
      payload: data,
    })
    // console.log(data)
    // }
  }

  // Get user repos
  const getRepos = async (login) => {
    setLoading()

    const { data } = await octokit.request(`GET /users/${login}/repos`, {
      // q: `${login}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    // console.log(data)
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }
  // Clear users
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })
  // console.log('STATE.USER', state.user)

  return (
    <GithubContext.Provider
      value={{
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
