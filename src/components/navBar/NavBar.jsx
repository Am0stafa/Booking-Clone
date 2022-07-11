import './navBar.css'
const NavBar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo">Booking Clone</span>
            <div className="navItems">
                <button className="navButton"><span>Register</span></button>
                <button className="navButton"><span>Login</span></button>
            </div>
        </div>    
    </div>
  )
}

export default NavBar