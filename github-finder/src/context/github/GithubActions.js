import { Octokit } from '@octokit/core'

const GITHUB_URL = process.env.REACT_APP_GITHUB_API
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
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: data.items,
  //   })
}
