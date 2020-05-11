import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import '../style/regLanding.css';

class LandingRegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameVal: '',
            passVal: '',
            monthValPlaceholder: 'Month: ',
            monthVal: '',
            dateValPlaceholder: 'Date: ',
            dateVal: '',
            yeareValPlaceholder: 'Year: ',
            yearVal: '',
            enoVal: '',
            emailVal: '',
            numVal: '',
            webVal: '',
            extendMonthDisp: { display: 'block' },
            specialMonth: { display: 'block' },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownMonth = this.handleDropdownMonth.bind(this);
        this.handleDropdownDate = this.handleDropdownDate.bind(this);
        this.handleDropdownYear = this.handleDropdownYear.bind(this);
    }

    handleDropdownMonth(event) {
        this.setState({
            monthVal: event.target.innerText,
            monthValPlaceholder: '',
            dateValPlaceholder: 'Date:',
            dateVal: '',
        });
        if (
            event.target.innerText === 'April' ||
            event.target.innerText === 'June' ||
            event.target.innerText === 'September' ||
            event.target.innerText === 'November'
        ) {
            this.setState({
                specialMonth: { display: 'block' },
                extendMonthDisp: { display: 'none' },
            });
        } else if (event.target.innerText === 'February') {
            this.setState({
                specialMonth: { display: 'none' },
                extendMonthDisp: { display: 'none' },
            });
        } else {
            this.setState({
                specialMonth: { display: 'block' },
                extendMonthDisp: { display: 'block' },
            });
        }
    }

    handleDropdownDate(event) {
        const { monthVal } = this.state;
        if (monthVal === '') {
            alert('Please select the month first');
        } else {
            this.setState({
                dateValPlaceholder: '',
                dateVal: event.target.innerText,
            });
        }
    }

    handleDropdownYear(event) {
        this.setState({
            yearVal: event.target.innerText,
            yeareValPlaceholder: '',
        });
    }

    handleChange(event) {
        if (event.target.name === 'name') {
            this.setState({ nameVal: event.target.value });
            //this.props.setAlert("Name Changes","Info")
        } else if (event.target.name === 'pass') {
            this.setState({ passVal: event.target.value });
        } else if (event.target.name === 'email') {
            this.setState({ emailVal: event.target.value });
        } else if (event.target.name === 'phone') {
            this.setState({ numVal: event.target.value });
        } else if (event.target.name === 'website') {
            this.setState({ webVal: event.target.value });
        } else if (event.target.name === 'entryno') {
            this.setState({ enoVal: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        //  add checks for all conditions especially dob and all
        //  alert('form is now being submitted');
        const {
            nameVal,
            passVal,
            monthVal,
            dateVal,
            emailVal,
            numVal,
            yearVal,
            webVal,
            enoVal,
        } = this.state;
        const obj = {
            name: nameVal,
            email: emailVal,
            password: passVal,
            entryno: enoVal,
            phone: numVal,
            dob: `${dateVal}-${monthVal}-${yearVal}`,
            website: webVal,
        };
        this.props.register(obj);
    }

    render() {
        const {
            nameVal,
            passVal,
            monthValPlaceholder,
            monthVal,
            dateValPlaceholder,
            dateVal,
            yeareValPlaceholder,
            yearVal,
            emailVal,
            numVal,
            webVal,
            extendMonthDisp,
            specialMonth,
            enoVal,
        } = this.state;
        return (
            <div className="formCont">
                <form
                    id="regform"
                    action="#"
                    method="POST"
                    onSubmit={this.handleSubmit}
                >
                    <div className="row rowTwo">
                        <input
                            required
                            style={{ width: '49%' }}
                            type="text"
                            name="name"
                            className=""
                            placeholder="Full Name: John Doe"
                            value={nameVal}
                            onChange={this.handleChange}
                        />
                        <input
                            required
                            style={{ width: '49%' }}
                            type="password"
                            name="pass"
                            className=""
                            placeholder="Password: XXXX "
                            value={passVal}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="row dropDownRow">
                        <div className="dropdownContainer">
                            <div className="dropdownDisp">
                                <span>{monthValPlaceholder}</span>
                                {monthVal}
                            </div>
                            <div className="dropdownDrop">
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    January
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    February
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    March
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    April
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    May
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    June
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    July
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    August
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    September
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    October
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    November
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownMonth}
                                >
                                    December
                                </div>
                            </div>
                        </div>
                        <div className="dropdownContainer">
                            <div className="dropdownDisp">
                                <span>{dateValPlaceholder}</span>
                                {dateVal}
                            </div>
                            <div className="dropdownDrop">
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    1
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    2
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    3
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    4
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    5
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    6
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    7
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    8
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    9
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    10
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    11
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    12
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    13
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    14
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    15
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    16
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    17
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    18
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    19
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    20
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    21
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    22
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    23
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    24
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    25
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    26
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    27
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                >
                                    28
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                    style={specialMonth}
                                >
                                    29
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                    style={specialMonth}
                                >
                                    30
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownDate}
                                    style={extendMonthDisp}
                                >
                                    31
                                </div>
                            </div>
                        </div>
                        <div className="dropdownContainer">
                            <div className="dropdownDisp">
                                <span>{yeareValPlaceholder}</span>
                                {yearVal}
                            </div>
                            <div className="dropdownDrop">
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2005
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2004
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2003
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2002
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2001
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    2000
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1999
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1998
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1997
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1996
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1995
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1994
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1993
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1992
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1991
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1990
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1989
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1988
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1987
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1986
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1985
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1984
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1983
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1982
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1981
                                </div>
                                <div
                                    className="dropdownElement"
                                    role="presentation"
                                    onClick={this.handleDropdownYear}
                                >
                                    1980
                                </div>
                            </div>
                        </div>
                    </div>
                    <input
                        required
                        style={{ width: '95.3%' }}
                        type="text"
                        name="entryno"
                        placeholder="Entry Number: "
                        value={enoVal}
                        onChange={this.handleChange}
                    />
                    <input
                        required
                        style={{ width: '95.3%' }}
                        type="email"
                        name="email"
                        placeholder="Email Adress: "
                        value={emailVal}
                        onChange={this.handleChange}
                    />
                    <input
                        style={{ width: '95.3%' }}
                        type="text"
                        name="website"
                        placeholder="Website: (if any)"
                        value={webVal}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default connect(null, { register, setAlert })(LandingRegForm);
