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
        
        let tempResultList = this.state.resultsList;
        return (
            <ul>
              {
                tempResultList.map((val, index) => {
                  
                  {console.log(index + " " + val);}
                    return (
                      <a onClick = {()=>{this.props.history.push('/home/StudentProfile'); Cookies.set("student", val)}}><li>{val}</li></a>
                  );
                })
              }
            </ul>
          );

    }

    submitSearchText()
    {
        let currentComponent = this;
        fetch('http://localhost:16648/api/Student/FindRoommateInfo/' + this.state.userSearchString, {
            mode: 'cors', // this cannot be 'no-cors'
            headers: {                
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
        }).then(res=>res.clone().json())
        .then(function(res) {
            console.log("hello " + res[0].firstName)
            var loopData = ''
            var i;
            for (i = 0; i < res.length; i++)
            {
                let testVariable = res[i].firstName;
                console.log("Next User: " + res[i].firstName)
                currentComponent.setState({ results: testVariable })
                console.log("Name:" + currentComponent.state.results)
                currentComponent.addItemResults();
            }
            
        
        })

       
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
