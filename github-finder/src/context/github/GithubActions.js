import { Octokit } from '@octokit/core'

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN4

const octokit = new Octokit({
  auth: `${GITHUB_TOKEN}`,
})

// Search all users
export const searchUsers = async (text) => {
  const { data } = await octokit.request('GET /search/users', {
    q: `${text}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return data.items
}

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    octokit.request(`/users/${login}`),
    octokit.request(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
