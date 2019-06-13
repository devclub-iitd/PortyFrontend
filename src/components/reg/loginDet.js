import React from 'react'
import '../../style/reg.css'






class About extends React.Component{

  render(){
    return(
      <div className="formCont">
        <form action="#">
          <input type="email" className = "" placeholder="Login Email: (make default value as the email entered by user)"></input>
          <div className = "row">
            <input type="password" className = "" placeholder="Password: "></input>
            <input type="password" className = "" placeholder="Confirm Password: "></input>
          </div>
          <input type="text" className = "" placeholder="User Name: "></input>
          <input type="text" className = "" placeholder="Password Hint: just incase you forget"></input>
        </form>
      </div>
    )
  }

}

export default About
