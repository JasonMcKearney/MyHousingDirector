import React, { Component } from 'react';
import "./StudentInfo.css"
import 'antd/dist/antd.css';
import Cookies from 'js-cookie';
import defaultlogo from '../img/default_logo.png'
import Select from "react-select";






export default class studentinfo extends Component {

    constructor() {
        super();
        
        
            /*fetch('http://localhost:16648/api/Student/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    username: Cookies.get("username")
                })
            }).then((Response) => Response.json())
                .then((result) => {
                    var ID = result.studentID;
                    var firstName = result.firstName;
                    var lastName = result.lastName;
                    var year = result.year;

                    Cookies.set("ID", ID);
                    Cookies.set("FN", firstName);
                    Cookies.set("LN", lastName);
                    Cookies.set("YR", year);
                })
*/

        this.state = {
            
            checked: false,
            values: [],
            options: [
                { label: "CAPE", value: 1 },
                { label: "Athletics", value: 2 },
                { label: "SGA", value: 3 },
                { label: "E-Sports", value: 4 },
                { label: "Theatre/Drama", value: 5 },
                { label: "Work Study", value: 6 },
                { label: "Other", value: 7 }
              ],
            userAnswers:[]
        }
       
       
       this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChange = this.onChange.bind(this);
    }



    onChangeCheckbox = e => {
        const isChecked = !this.state.checked;
        this.setState({
          checked: isChecked,
          values: isChecked ? this.state.options : this.state.values
        });
      };
      onChange = opt => {
        const allOptionsSelected = opt.length === this.state.options.length;
        this.setState({
          checked: allOptionsSelected ? true : false,
          values: opt
        });
      };


    render() {

        

        return (
            
                
            
            
            <div className="form-wrapper">
                <form> 
                    <div className="question-wrapper">
                        <label className ="Form-Label">When do you wake up? </label>
                        <input type ="time"></input>
                    </div>

                    <div className="question-wrapper" >
                        <label className ="Form-Label">What time do you sleep?</label>
                        <input type = "time"></input>
                    </div>
                  
                    <div className="question-wrapper">
                        <label className ="Form-Label"> What best decribes your study habits?</label>
                        <select className='form-select'>
                            <option>Please selet an option</option>
                            <option>Ambient noise: I dont mind some background noise but I need to have fewer distractions to study effectively.</option>
                            <option>Don't take work home: I do most of my schoolwork at the library or elsewhere out of my room. I try not to so a lot of work at home.</option>
                            <option>Multitasker: I like to have music or the TV on in my room or can talk on the phone while doing work.</option>
                            <option>Quiet: I require quiet and few distractions to really get stuff done.</option>
                            </select>
                    </div>

                    <div className="question-wrapper">
                    <label className ="Form-Label">When do you study best?</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>Can do homework whenever</option>
                            <option>After 8pm</option>
                            <option>Between 12-5pm</option>
                            <option>between 8am-12pm</option>

                        </select>
                    </div>
                   
                    <div className="question-wrapper">
                    <label className ="Form-Label">Which describes how you prefer to use your room?</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>Room is a sanctuary: I perfer privacy and personal space.</option>
                            <option>Room is a social hub: I enjoy people dropping by often.</option>
                            <option>Room varies: I invite friends over but I also need specified quiet time for studying </option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">Which best describes your bedroom's apperance?</label>
                        <select className='form-select'> 
                            <option>Please select an option</option>
                            <option>Casual: My personal space is farily clean with some clutter but I value keeping common areas pretty clean.</option>
                            <option>Messy: I sometimes drop my stuff right where I am stadning and it stays there until I need it again. Cleanliness is not a high priority</option>
                            <option>Neat: I am orderly clean and tidy. I regularly clean common areas.</option>
                        </select>
                    </div>
                    <div className="question-wrapper" >
                    <label className ="Form-Label">What are your preferences about lending your items (clothes, food, electronics, etc.)?</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>Not lending out my items</option>
                            <option>Let anyone borrow my items</option>
                            <option>Lend out my items upon request</option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                    <label className ="Form-Label">What are your preferences on your guests staying in the room?</label>
                    <select className='form-select' >
                        <option>Will allow anyone to come by and stay with us when discussed between roommate</option>
                        <option>Will not allow any vistors overnight to stay but people can drop by.</option>
                        <option>Will allow any vistors to drop by or stay overnight.</option>
                    </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">What are you involved in on campus,or would lke to be involved?</label>
                        <Select
                            isMulti ={true}
                            onChange={this.onChange}
                            options = {this.state.options}
                            value={this.state.values}
                            className='form-select'
                            />
                          
                     </div>
                     <div className="question-wrapper">
                        <label className ="Form-Label">What do you do on a typical weekend?</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>On campus most weekends</option>
                            <option>Go home most weekends</option>
                            <option>Travel with SNHU Athletics Team</option>
                            <option>Work</option>
                            <option>Go out</option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">Describe your smoking/vaping habits</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>Never:this means you literally never smoke</option>
                            <option>Occasionally: while you do not typically smoke you may have a cigarette once in a while.</option>
                            <option>Frequently: you smoke on a regular basis such as daily ot weekly. </option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">How do you describe your alcohol use? This will not impact your conduct record.</label>
                        <select className='form-select'>
                            <option>Please select an option</option>
                            <option>Not a drinker and will not allow it in the unit</option>
                            <option>Not a drinker but may allow in the unit</option>
                            <option>Drink reponsibly and will allow in the unit</option> 
                        </select>
                    </div>

                    <button type="submit" >Submit</button>
                
                </form>
                </div>
         


        );
    }
}