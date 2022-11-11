import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { fetchUser }from '../../../api/UserServices'
import { IUser } from '../../../types/types'

const TestUseQuery = () => {
  const { isLoading, error, data } = useQuery<IUser, Error>({
      queryFn: fetchUser
  })
    
  if (isLoading) return (
    <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
    />
  )
    
  if (error) return (<div>{error.message}</div>)
  
  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  )
}
export default TestUseQuery