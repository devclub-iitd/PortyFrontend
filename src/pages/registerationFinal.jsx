import React from 'react';
import Intro from '../components/regFinal/intro';
import Image from '../components/regFinal/image';
import About from '../components/regFinal/about';
import Location from '../components/regFinal/location';
import Work from '../components/regFinal/work';
import Volunteer from '../components/regFinal/volunteer';
import Education from '../components/regFinal/education';
import '../style/regFinal.css';


class RegFinal extends React.Component{

  render(){
    return(
      <div style={{paddingBottom: 100}}>
        <Image/>
        <Intro name="aryan"/>
        <About/>
        <Location/>
        <Work/>
        <Volunteer/>
        <Education/>
        <div className="headerSimple">
          <div className="headerSimpleTitle"> Portfolio Creator <span>| Register</span></div>
        </div>
      </div>


    )
  }
}

export default RegFinal;
