import React from 'react';
import '../../style/reg.css';


class About extends React.Component {
  render() {
    return (
      <div className="formCont">
        <form action="#">
          <input type="email" className="" placeholder="Login Email: (make default value as the email entered by user)" />
          <div className="row">
            <input type="password" className="" placeholder="Password: " />
            <input type="password" className="" placeholder="Confirm Password: " />
          </div>
          <input type="text" className="" placeholder="User Name: " />
          <input type="text" className="" placeholder="Password Hint: just incase you forget" />
        </form>
      </div>
    );
  }
}

export default About;
