import React, { Component } from 'react';
import "./StudentInfo.css"
import Cookies from 'js-cookie';
import defaultlogo from '../img/default_logo.png'
import Select from "react-select";
export default class studentinfo extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            values: [],
            options: [
                { label: "CAPE", value: "CAPE" },
                { label: "Athletics", value: "Athletics" },
                { label: "SGA", value: "SGA" },
                { label: "E-Sports", value: "E-Sports" },
                { label: "Theatre/Drama", value: "Theatre/Drama" },
                { label: "Work Study", value: "Work Study" },
                { label: "Other", value: "Other" } ],
              optionsQuestion1: [{label:'Before 6 am',value:'Before 6 am'},
                                 {label:'Between 6 am-9 am',value:'Between 6 am-9 am'},
                                 {label:'After 9 am',value:'After 9 am'}],
              optionsQuestion2: [{label:'Before 8 pm',value:'Before 8 pm'},
                                 {label:'Between 8 pm - 11pm',value:'Between 8 pm - 11 pm'},
                                 {label:'After 11 pm',value:'After 11 pm'}],
              optionsQuestion3:[{label:'Ambient noise: I dont mind some background noise but I need to have fewer distractions to study effectively.',value:'Ambient noise: I dont mind some background noise but I need to have fewer distractions to study effectively.'},
                                {label:'Dont take work home: I do most of my schoolwork at the library or elsewhere out of my room. I try not to do a lot of work at home.',value:'Dont take work home: I do most of my schoolwork at the library or elsewhere out of my room. I try not to do a lot of work at home.'},
                                {label:'Multitasker: I like to have music or the TV on in my room or can talk on the phone while doing work.',value:'Multitasker: I like to have music or the TV on in my room or can talk on the phone while doing work.'},
                                {label:'Quiet: I require quiet and few distractions to really get stuff done.',value:'Quiet: I require quiet and few distractions to really get stuff done.'}],
              optionsQuestion8: [{label: 'Will allow anyone to come by and stay with us when discussed between roommate',value:'Will allow anyone to come by and stay with us when discussed between roommate'},
                                 { label:'Will not allow any vistors overnight to stay but people can drop by.',value:'Will not allow any vistors overnight to stay but people can drop by.',},
                                 { label: 'Will allow any vistors to drop by or stay overnight.', value:'Will allow any vistors to drop by or stay overnight.'}  ],
              optionsQuestion4: [{label:'Can do homework whenever',value:'Can do homework whenever'},
                                 {label:'After 8pm',value:'After 8pm'},
                                 {label:'Between 12-5pm',value:'Between 12-5pm'},
                                 {label:'between 8am-12pm',value:'between 8am-12pm'}],
             optionsQuestion5: [{label:'Room is a sanctuary: I perfer privacy and personal space.',value:'Room is a sanctuary: I perfer privacy and personal space.'},
                                {label:'Room is a social hub: I enjoy people dropping by often.', value:'Room is a social hub: I enjoy people dropping by often.'},
                                {label:'Room varies: I invite friends over but I also need specified quiet time for studying',value:'Room varies: I invite friends over but I also need specified quiet time for studying'}],
             optionsQuestion6: [{label:'Casual: My personal space is farily clean with some clutter but I value keeping common areas pretty clean.', value:'Casual: My personal space is farily clean with some clutter but I value keeping common areas pretty clean.'},
                                {label:'Messy: I sometimes drop my stuff right where I am stadning and it stays there until I need it again. Cleanliness is not a high priority', value:'Messy: I sometimes drop my stuff right where I am stadning and it stays there until I need it again. Cleanliness is not a high priority'},
                                {label:'Neat: I am orderly clean and tidy. I regularly clean common areas.', value:'Neat: I am orderly clean and tidy. I regularly clean common areas.'}],
             optionsQuestion7: [{label:'Not lending out my items', value:'Not lending out my items'},
                                {label:'Let anyone borrow my items',value:'Let anyone borrow my items'},
                                {label:'Lend out my items upon request', value:'Lend out my items upon request'}],
             optionsQuestion10: [{label:'On campus most weekends', value:'On campus most weekends'},
                                 {label:'Go home most weekends',value:'Go home most weekends'},
                                 {label:'Travel with SNHU Athletics Team',value:'Travel with SNHU Athletics Team'},
                                 {label:'Work',value:'Work'},
                                 {label:'Go out',value:'Go out'}],
             optionsQuestion11: [{label:'Never:this means you literally never smoke', value:'Never:this means you literally never smoke'},
                                 {label:'Occasionally: while you do not typically smoke you may have a cigarette once in a while.',value:'Occasionally: while you do not typically smoke you may have a cigarette once in a while.'},
                                 {label:'Frequently: you smoke on a regular basis such as daily ot weekly.',value:'Frequently: you smoke on a regular basis such as daily ot weekly.'}],
             optionsQuestion12: [{label:'Not a drinker and will not allow it in the unit', value:'Not a drinker and will not allow it in the unit'},
                                 {label:'Not a drinker but may allow in the unit', value:'Not a drinker but may allow in the unit'},
                                 {label:'Drink reponsibly and will allow in the unit',value:'Drink reponsibly and will allow in the unit'}],
              userAnswers:{Question1:'placeholder', Question2:'', Question3:'', Question4:'',Question5:'', Question6:'', 
                        Question7:'',Question8:'', Question9:'', Question10:'', Question11:'', Question12:''}
        }
        this.onChange = this.onChange.bind(this);
       this.sendQuestionUpdate = this.sendQuestionUpdate.bind(this);
    }
    componentDidMount(){
            this.setSurveyQuestions();
    }
    sendQuestionUpdate ()
      {

        console.log("button has been clicked");
        fetch("http://localhost:16648/api/Student/submitSurveyQuestions", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
            body: JSON.stringify({
               Question1: this.state.userAnswers.Question1,
               Question2: this.state.userAnswers.Question2,
               Question3: this.state.userAnswers.Question3,
               Question4: this.state.userAnswers.Question4,
               Question5: this.state.userAnswers.Question5,
               Question6: this.state.userAnswers.Question6,
               Question7: this.state.userAnswers.Question7,
               Question8: this.state.userAnswers.Question8,
               Question9: this.state.userAnswers.Question9,
               Question10: this.state.userAnswers.Question10,
               Question11: this.state.userAnswers.Question11,
               Question12: this.state.userAnswers.Question12,
               UserID: Cookies.get("UD"),
            }),
        })
            .then((Response) => Response.json())
            .then((result) => {
                console.log("response: " + result.status);
                alert(result.message);
            });
      };
    onChangeQuestion(event,questionNum){

        let newUserAnswers = this.state.userAnswers;

        console.log("Question number" + questionNum);
        console.log("Question Value" + this.state.values[0]);
        if(questionNum == 1)
        {
           
            Cookies.set("Question1", event);
            newUserAnswers.Question1 = Cookies.get("Question1")
            console.log("State value for Question 1: " + this.state.userAnswers.Question1)
        }
        else if(questionNum == 2)
        {
            Cookies.set("Question2", event);
            newUserAnswers.Question2 = Cookies.get("Question2")

        }
        else if(questionNum == 3)
        {
            Cookies.set("Question3", event);
            newUserAnswers.Question3 = Cookies.get("Question3")

        }
        else if(questionNum == 4)
        {
            Cookies.set("Question4", event);
            newUserAnswers.Question4 = Cookies.get("Question4")

        }
        else if(questionNum == 5)
        {
            Cookies.set("Question5", event);
            newUserAnswers.Question5 = Cookies.get("Question5")

        }
        else if(questionNum == 6)
        {
            
            Cookies.set("Question6", event);
            newUserAnswers.Question6 = Cookies.get("Question6")
        }
        else if(questionNum == 7)
        {
            Cookies.set("Question7", event);
            newUserAnswers.Question7 = Cookies.get("Question7")

        }
        else if(questionNum == 8)
        {
            Cookies.set("Question8", event);
            newUserAnswers.Question8 = Cookies.get("Question8")

        }
        else if(questionNum == 9)
        {
            Cookies.set("Question9", this.state.values);
            newUserAnswers.Question9 = Cookies.get("Question9")

        }
        else if(questionNum == 10)
        {
            Cookies.set("Question10", event);
            newUserAnswers.Question10 = Cookies.get("Question10")
        }
        else if(questionNum == 11)
        {
            Cookies.set("Question11", event);
            newUserAnswers.Question11 = Cookies.get("Question11")

        }
        else if(questionNum == 12)
        {
            Cookies.set("Question12", event);
            newUserAnswers.Question12 = Cookies.get("Question12")
        }

        this.setState({userAnswers: newUserAnswers});
    }
    setSurveyQuestions(){

        let newUserAnswers = this.state.userAnswers;
        fetch(
            "http://localhost:16648/api/Student/getCurrentSurveyQuestions/" + Cookies.get("UD"),
            {
                mode: "cors", // this cannot be 'no-cors'
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },

                method: "POST",
            }
        ).then((res) => res.clone().json())

            .then(function(res) {
            
                console.log("The data has reached");
                console.log("Question3 " + res.Question1)
                
                newUserAnswers.Question1 = res.question1;
                newUserAnswers.Question2 = res.question2;
                newUserAnswers.Question3 = res.question3;
                newUserAnswers.Question4 = res.question4;
                newUserAnswers.Question5 = res.question5;
                newUserAnswers.Question6 = res.question6;
                newUserAnswers.Question7 = res.question7;
                newUserAnswers.Question8 = res.question8;
                newUserAnswers.Question9 = res.question9;
                newUserAnswers.Question10 = res.question10;
                newUserAnswers.Question11 = res.question11;
                newUserAnswers.Question12 = res.question12;
                
                Cookies.set("Question1", newUserAnswers.Question1);
                Cookies.set("Question2", newUserAnswers.Question2);
                Cookies.set("Question3", newUserAnswers.Question3);
                Cookies.set("Question4", newUserAnswers.Question4);
                Cookies.set("Question5", newUserAnswers.Question5);
                Cookies.set("Question6", newUserAnswers.Question6);
                Cookies.set("Question7", newUserAnswers.Question7);
                Cookies.set("Question8", newUserAnswers.Question8);
                Cookies.set("Question9", newUserAnswers.Question9);
                Cookies.set("Question10", newUserAnswers.Question10);
                Cookies.set("Question11", newUserAnswers.Question11);
                Cookies.set("Question12", newUserAnswers.Question12);

                this.setState({userAnswers: newUserAnswers});
            })

    }
      onChange = opt => {
        const allOptionsSelected = opt.length === this.state.options.length;
        this.setState({
          checked: allOptionsSelected ? true : false,
          values: opt
        });

       this.onChangeQuestion(this.state.values,9);
      };

      
    render() {
        return (    
            <div className="form-wrapper">
               
                    <div className="question-wrapper">
                        <label className ="Form-Label">When do you wake up? </label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 1)}
                                options = {this.state.optionsQuestion1}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question1}
                                placeholder= {Cookies.get("Question1")}
                            />
                    </div>

                    <div className="question-wrapper" >
                        <label className ="Form-Label">What time do you go to sleep?</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 2)}
                                options = {this.state.optionsQuestion2}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question2}
                                placeholder= {Cookies.get("Question2")}
                            />
                    </div>
                  
                    <div className="question-wrapper">
                        <label className ="Form-Label"> What best decribes your study habits?</label>
                            <Select
                            onChange={e => this.onChangeQuestion(e.value, 3)}
                            options = {this.state.optionsQuestion3}
                            className='form-selecter'
                            value = {this.state.userAnswers.Question3}
                            placeholder= {Cookies.get("Question3")}
                            />
                    </div> 

                    <div className="question-wrapper">
                    <label className ="Form-Label">When do you study best?</label>
                      <Select
                        onChange={e => this.onChangeQuestion(e.value, 4)}
                        options = {this.state.optionsQuestion4}
                        className='form-selecter'
                        value = {this.state.userAnswers.Question4}
                        placeholder= {Cookies.get("Question4")}
                        />
                    </div>
                   
                    <div className="question-wrapper">
                        <label className ="Form-Label">Which describes how you prefer to use your room?</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 5)}
                                options = {this.state.optionsQuestion5}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question5}
                                placeholder= {Cookies.get("Question5")}
                            />
                        </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">Which best describes your bedroom's apperance?</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 6)}
                                options = {this.state.optionsQuestion6}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question6}
                                placeholder= {Cookies.get("Question6")}
                            />
                    </div>
                    <div className="question-wrapper" >
                        <label className ="Form-Label">What are your preferences about lending your items (clothes, food, electronics, etc.)?</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 7)}
                                options = {this.state.optionsQuestion7}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question7}
                                placeholder= {Cookies.get("Question7")}
                            />
                
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">What are your preferences on your guests staying in the room?</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 8)}
                                options = {this.state.optionsQuestion8}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question8}
                                placeholder= {Cookies.get("Question8")}
                            />
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
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 10)}
                                options = {this.state.optionsQuestion10}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question10}
                                placeholder= {Cookies.get("Question10")}
                            />
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">Describe your smoking/vaping habits</label>
                            <Select
                                onChange={e => this.onChangeQuestion(e.value, 11)}
                                options = {this.state.optionsQuestion11}
                                className='form-selecter'
                                value = {this.state.userAnswers.Question11}
                                placeholder= {Cookies.get("Question11")}
                             />
                    </div>

                    <div className="question-wrapper">
                        <label className ="Form-Label">How do you describe your alcohol use? This will not impact your conduct record.</label>
                            <Select
                                    onChange={e => this.onChangeQuestion(e.value, 12)}
                                    options = {this.state.optionsQuestion12}
                                    className='form-selecter'
                                    value = {this.state.userAnswers.Question12}
                                    placeholder= {Cookies.get("Question12")}
                            />
                    </div>
                 <button id ="primary-button" onClick={this.sendQuestionUpdate} >Submit</button>
                </div>
        );
    }
}