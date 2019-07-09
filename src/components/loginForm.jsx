import React from 'react';
import '../style/regLanding.css';

class LoginFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailVal: '',
      passVal: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'email') {
      this.setState({ emailVal: event.target.value });
    } else if (event.target.name === 'passVal') {
      this.setState({ passVal: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //  add checks for all conditions especially dob and all
    //alert('form is now being submitted');
  }

  render() {
    const {
      emailVal, passVal,
    } = this.state;
    return (
      <div className="formCont">
        <form id="loginform" action="#" method="POST" onSubmit={this.handleSubmit}>
          <input style={{ width: '95.3%' }} type="email" name="email" placeholder="Email Adress: " value={emailVal} onChange={this.handleChange} />
          <input style={{ width: '95.3%' }} type="password" name="password" placeholder="Password: " value={passVal} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default LoginFrom;
