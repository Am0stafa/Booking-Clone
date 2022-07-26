import Featured from '../../components/featured/Featured'
import FeaturedProperty from '../../components/featuredProperty/FeaturedProperty'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import NavBar from '../../components/navBar/NavBar'
import PropertyList from '../../components/propertyList/PropertyList'
import './home.css'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Home guest love</h1>
        <FeaturedProperty/>
        <MailList/>
      </div>
    </div>
  )
}

export default Home