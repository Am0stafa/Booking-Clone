import './navBar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const NavBar = () => {
  const {user} = useContext(AuthContext)


  return (
    <div className="navbar">
        <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Booking Clone</span>
          </Link>
            {user ? user.username :(<div className="navItems">
                <button className="navButton"><span>Register</span></button>
                <Link  to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                  <button className="navButton"><span>Login</span></button>
                </Link>
                </div>)
            }
     
        </div>    
    </div>
  )
}

export default NavBar