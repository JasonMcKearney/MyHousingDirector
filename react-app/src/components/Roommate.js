import React, { Component } from 'react'
import "./Roommate.css"
import Cookies from  'js-cookie'                                                       

export default class Roommate extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            userSearchString : '',
            results : '',
            resultsList : [],
            studentList : [],
        }
           
            this.setSearchText = this.setSearchText.bind(this);
            this.submitSearchText = this.submitSearchText.bind(this);
            this.printResults = this.printResults.bind(this);
            this.addItemResults = this.addItemResults.bind(this);
    }

    
    setSearchText(event)
    {
         this.setState({ userSearchString: event.target.value });
         console.log(this.state.userSearchString)
    }
    addItemResults()
    {
            let tempResultList = this.state.resultsList;
            tempResultList.push(this.state.results);
            this.setState({
                tempResultList
            });

            console.log("item added to the list")
    }
    printResults(){
        
        let {studentList} = this.state;
        console.log(this.state.studentList)
        return (
            <ul>
              {
                this.state.studentList.map((val, index) => {
                    return (
                      <a onClick = {()=>{this.props.history.push('/home/StudentProfile'); Cookies.set("student", val.firstName)}}><li>{val}</li></a>
                  );
                })
              }
            </ul>
          );

    }

    submitSearchText()
    {
        let currentComponent = this;
        console.log(this.state.userSearchString)
        fetch('http://localhost:16648/api/Student/FindRoommateInfo/' + this.state.userSearchString, {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
        }).then(res=>res.clone().json())
        .then(function(res) {
           
           const studentArray = currentComponent.state.studentList.slice();
           console.log("studentArray before filling: " + studentArray)
           var i;
            
            for( i = 0; i < res.length; i++)
             {
                 console.log("firstname: " + res[0].firstname)
                 console.log("lastname: " + res[0].lastName)
                 console.log("year: " + res[0].year)

                 console.log(res[i].year)
              let obj = {
                firstName: res[0].firstName,
                lastName: res[0].lastName,
                year : res[0].year,
                }
                studentArray.push(obj)
           console.log(studentArray)

            }
            console.log(currentComponent.state.studentList)
            currentComponent.setState({studentList: studentArray})
            console.log(currentComponent.state.studentList)

        });

       
    }

    render() {
        return (
        
        
            <div class= "Search container">
    
                <form>
                    <input onChange= {this.setSearchText} type="text" placeholder="Please enter a name you wish to search"/>

                   
                </form>
                <button type ="submit" onClick ={this.submitSearchText}>search</button>
                

                <section>  
                    <div>    
                        <div className="container-results">
                            { this.printResults() }
                        </div>
                    </div>  
                </section>
           
             </div>
        
        
            );


    }





}
