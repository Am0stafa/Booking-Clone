import './mailList.css'


const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">
            Save Time, save Money!
        </h1>
        <span className="mailDesc">
            Sign up and we will send you the best deals
        </span>
        <div className="mailInputContainer">
            <input type="text" className="" placeholder="Enter your email"/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList
