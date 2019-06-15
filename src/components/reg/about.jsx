import React from 'react';
import '../../style/reg.css';


class About extends React.Component {
  constructor(props) {
    super(props);
    this.subbtn = React.createRef();
    this.state = {
      nameVal: '',
      entryVal: '',
      emailVal: '',
      numVal: '',
      webVal: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({ nameVal: event.target.value });
    } else if (event.target.name === 'eno') {
      this.setState({ entryVal: event.target.value });
    } else if (event.target.name === 'email') {
      this.setState({ emailVal: event.target.value });
    } else if (event.target.name === 'phone') {
      this.setState({ numVal: event.target.value });
    } else if (event.target.name === 'website') {
      this.setState({ webVal: event.target.value });
    }
  }

  handleSubmit(event) {
    alert('you are submitting');
    event.preventDefault();
  }

  render() {
    return (
      <div className="formCont">
        <form id="regform" action="#" method="POST" onSubmit={this.handleSubmit}>
          <div className="row">
            <input type="text" name="name" className="" placeholder="Full Name: John Doe" value={this.state.nameVal} onChange={this.handleChange} required />
            <input type="text" name="eno" className="" placeholder="Entry Number: 2018XX20101" value={this.state.entryVal} onChange={this.handleChange} />
          </div>
          <div className="row">
            insert drop down for dob
          </div>
          <input type="email" name="email" placeholder="Email Adress: " value={this.state.emailVal} onChange={this.handleChange} />
          <input type="number" name="phone" placeholder="Phone Number: " value={this.state.numVal} onChange={this.handleChange} />
          <input type="text" name="website" placeholder="Website: (if any)" value={this.state.webVal} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

export default About;
