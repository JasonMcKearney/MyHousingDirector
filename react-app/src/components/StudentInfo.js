import React, { Component } from 'react';
import "./StudentInfo.css"
import 'antd/dist/antd.css';
import Cookies from 'js-cookie';
import defaultlogo from '../img/default_logo.png'
import Select from "react-select";






export default class studentinfo extends Component {

    constructor() {
        super();
        

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
            userAnswers:{Question1:'placeholder', Question2:'', Question3:'', Question4:'',Question5:'', Question6:'', 
                        Question7:'',Question8:'', Question9:'', Question10:'', Question11:'', Question12:''}
        }
       
       //this.userAnswers = this.userAnswers.bind(this);
       this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChangeQuestion(event,questionNum){

        let newUserAnswers = this.state.userAnswers;

        console.log("Question number" + questionNum);
        console.log("Question Value" + event);
        if(questionNum == 1)
        {
            
            newUserAnswers.Question1 = event;
            this.setState({userAnswers: newUserAnswers});
            console.log("State value for Question 1: " + this.state.userAnswers.Question1)
        }
        else if(questionNum == 2)
        {
            newUserAnswers.Question2 = event;
        }
        else if(questionNum == 3)
        {
            newUserAnswers.Question3 = event;
        }
        else if(questionNum == 4)
        {
            newUserAnswers.Question4 = event;
        }
        else if(questionNum == 5)
        {
            newUserAnswers.Question5 = event;
        }
        else if(questionNum == 6)
        {
            newUserAnswers.Question6 = event;
        }
        else if(questionNum == 7)
        {
            newUserAnswers.Question7 = event;
        }
        else if(questionNum == 8)
        {
            newUserAnswers.Question8 = event;
        }
        else if(questionNum == 9)
        {
            newUserAnswers.Question9 = event;
        }
        else if(questionNum == 10)
        {
            newUserAnswers.Question10 = event;
        }
        else if(questionNum == 11)
        {
            newUserAnswers.Question11 = event;
        }
        else if(questionNum == 12)
        {
            newUserAnswers.Question12 = event;
        }

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
                        <input onChange={e => this.onChangeQuestion(e.target.value, 1)}type ="time"></input>
                    </div>

                    <div className="question-wrapper" >
                        <label className ="Form-Label">What time do you sleep?</label>
                        <input onChange={e => this.onChangeQuestion(e.target.value, 3)} type = "time"></input>
                    </div>
                  
                    <div className="question-wrapper">
                        <label className ="Form-Label"> What best decribes your study habits?</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 3)} className='form-select'>
                            <option>Please selet an option</option>
                            <option>Ambient noise: I dont mind some background noise but I need to have fewer distractions to study effectively.</option>
                            <option>Don't take work home: I do most of my schoolwork at the library or elsewhere out of my room. I try not to so a lot of work at home.</option>
                            <option>Multitasker: I like to have music or the TV on in my room or can talk on the phone while doing work.</option>
                            <option>Quiet: I require quiet and few distractions to really get stuff done.</option>
                            </select>
                    </div>

                    <div className="question-wrapper">
                    <label className ="Form-Label">When do you study best?</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 4)} className='form-select'>
                            <option>Please select an option</option>
                            <option>Can do homework whenever</option>
                            <option>After 8pm</option>
                            <option>Between 12-5pm</option>
                            <option>between 8am-12pm</option>

                        </select>
                    </div>
                   
                    <div className="question-wrapper">
                    <label className ="Form-Label">Which describes how you prefer to use your room?</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 5)} className='form-select'>
                            <option>Please select an option</option>
                            <option>Room is a sanctuary: I perfer privacy and personal space.</option>
                            <option>Room is a social hub: I enjoy people dropping by often.</option>
                            <option>Room varies: I invite friends over but I also need specified quiet time for studying </option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">Which best describes your bedroom's apperance?</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 6)} className='form-select'> 
                            <option>Please select an option</option>
                            <option>Casual: My personal space is farily clean with some clutter but I value keeping common areas pretty clean.</option>
                            <option>Messy: I sometimes drop my stuff right where I am stadning and it stays there until I need it again. Cleanliness is not a high priority</option>
                            <option>Neat: I am orderly clean and tidy. I regularly clean common areas.</option>
                        </select>
                    </div>
                    <div className="question-wrapper" >
                    <label className ="Form-Label">What are your preferences about lending your items (clothes, food, electronics, etc.)?</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 7)} className='form-select'>
                            <option>Please select an option</option>
                            <option>Not lending out my items</option>
                            <option>Let anyone borrow my items</option>
                            <option>Lend out my items upon request</option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                    <label className ="Form-Label">What are your preferences on your guests staying in the room?</label>
                    <select onChange={e => this.onChangeQuestion(e.target.value, 8)} className='form-select' >
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
                        <select onChange={e => this.onChangeQuestion(e.target.value, 10)} className='form-select'>
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
                        <select onChange={e => this.onChangeQuestion(e.target.value, 11)} className='form-select'>
                            <option>Please select an option</option>
                            <option>Never:this means you literally never smoke</option>
                            <option>Occasionally: while you do not typically smoke you may have a cigarette once in a while.</option>
                            <option>Frequently: you smoke on a regular basis such as daily ot weekly. </option>
                        </select>
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">How do you describe your alcohol use? This will not impact your conduct record.</label>
                        <select onChange={e => this.onChangeQuestion(e.target.value, 12)} className='form-select'>
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