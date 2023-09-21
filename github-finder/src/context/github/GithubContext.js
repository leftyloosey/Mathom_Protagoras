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
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading()

    const { data } = await octokit.request('GET /search/users', {
      q: `${text}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    console.log(data)
    dispatch({
      type: 'GET_USERS',
      payload: data.items,
    })
  }

  const getUser = async (login) => {
    setLoading()

    const { data } = await octokit.request(`GET /users/${login}`, {
      //   q: `${text}`,
      // username: 'USERNAME',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    // if (data.status === 404) {
    //   window.location = '/notfound'
    // } else {
    dispatch({
      type: 'GET_USER',
      payload: data.items,
    })
    // }
    console.log(data)
  }

  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
