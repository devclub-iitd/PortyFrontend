import React from 'react';
import '../../style/reg.css';


class About extends React.Component {
  render() {
    return (
      <div className="formCont">
        <form action="#">
          <input type="text" className="" placeholder="School Education: i.e. completed 12th class" />
          <input type="text" className="" placeholder="Current Institution: IIT Delhi" />
          <div className="row">
            <input type="text" className="" placeholder="Discipline: Computer Science" />
            <input type="text" className="" placeholder="Expected Graduation Year: 2022" />
          </div>
          <input type="text" className="" placeholder="Current CGPA: " />
          <input type="email" className="" placeholder="Institute Email ID " />
        </form>
      </div>
    );
  }
}

export default About;
