import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'

function TestUseQuery() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
            res.json()
          )
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
    
      if (error) return (<div>'An error has occurred: ' + error</div>)
    
      return (
        <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{' '}
          <strong>✨ {data.stargazers_count}</strong>{' '}
          <strong>🍴 {data.forks_count}</strong>
        </div>
      )
}
export default TestUseQuery