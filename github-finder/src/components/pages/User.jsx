// import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/GithubContext'

const User = () => {
  const { getUser, user, loading } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  // console.log('USER.JSX', user)
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      <div className='w-full mx-auto-lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost'>
            Back To Search
          </Link>
          <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
            <div className='custom-card-image mb-6 md:mb-0'>
              <div className='rounded-lg shadow-xl card image-full'>
                <figure>
                  <img alt='avatar_url' src={avatar_url} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
