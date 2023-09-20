import { createContext, useReducer } from 'react'
import { Octokit } from '@octokit/core'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN2

const octokit = new Octokit({
  auth: `${GITHUB_TOKEN}`,
})

// const { data } = await octokit.request('GET /search/users', {
//   q: 'leftyloosey',
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28',
//   },
// })
// const response = await octokit.request('GET /orgs/{org}/repos', {
//   org: 'octokit',
//   type: 'private',
// })
// const { data } = await octokit.request('/users/search/')

// console.log(data)

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading()

    // const params = new URLSearchParams({
    //   q: text,
    // })
    // const response = await fetch(`${GITHUB_URL}/search/users/${params}`, {
    //   headers: {
    //     Authorization: `token ${GITHUB_TOKEN}`,
    //   },
    // })
    // const { items } = await response.json()
    console.log(text)

    // const octokit = new Octokit({
    //   auth: `${GITHUB_TOKEN}`,
    // })

    const { data } = await octokit.request('GET /search/users', {
      q: `${text}`,
      //   q: 'leftyloosey',
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
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
