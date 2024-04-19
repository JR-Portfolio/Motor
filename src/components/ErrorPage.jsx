import { useRouteError } from 'react-router-dom'

function Error() {
    const error = useRouteError()
    console.log("Error coming from other comp: ", error)
  return (
    <div>
      <h3>Error: {error.message} 
      {error.statusText} - {error.status}</h3>
    </div>
  )
}

export default Error