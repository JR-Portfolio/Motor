
localStorage.clear()

function Logout() {
    localStorage.clear()
    window.location.reload()
  return (
    <div><h3 style = {{textAlign:"center"}}>You have been ejected!</h3>
        <br />
        
    </div>
  )
}

export default Logout