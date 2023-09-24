import { Octokit } from '@octokit/core'

// const GITHUB_URL = process.env.REACT_APP_GITHUB_API
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN4

const octokit = new Octokit({
  auth: `${GITHUB_TOKEN}`,
})

// Search all users
export const searchUsers = async (text) => {
  //   setLoading()

  const { data } = await octokit.request('GET /search/users', {
    q: `${text}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return data.items
}

// Get single user
export const getUser = async (login) => {
  const { data } = await octokit.request(`GET /users/${login}`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  // if (data.status === 404) {
  //   window.location = '/notfound'
  // } else {
  // dispatch({
  //   type: 'GET_USER',
  //   payload: data,
  // })
  // console.log(data)
  // }
  return data
}

// Get user repos
export const getRepos = async (login) => {
  const { data } = await octokit.request(`GET /users/${login}/repos`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return data
}
