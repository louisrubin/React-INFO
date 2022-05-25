import React, {Component, Fragment } from 'react'; 
<<<<<<< HEAD
import './Estilos.css'

class Counter extends Component {

    state = {
        counter : 0,
    }
    // clase infor 16.5.22
    constructor(props){
        super(props);   // referencia a 'Component' from react


=======

class Counter extends Component {


    // clase infor 16.5.22
    constructor(props){
        super(props);

        this.state = {
            counter: 0,
        };
>>>>>>> bdac7778fa875dbd5c8d391963d8f4c8d25c548c

        this.increment = this.increment.bind(this);     // hay que 'bindear' las funciones en el constructor
        this.decrement = this.decrement.bind(this);
    }
    

<<<<<<< HEAD
    increment = (e) => {
        if(e.ctrlKey){
            //              { objeto literal}
            this.setState({counter: this.state.counter + 3 });  
        }else{ 
            this.setState({counter: this.state.counter + 1 });         
        }
    }
    
    decrement = (e) => {
        // only can decrease the count if greater than 0 
        if (this.state.counter > 0){
            if(e.altKey){
                this.setState({counter: 0});
            }else{
                this.setState({counter: this.state.counter - 1});
            }
=======
    increment = () => this.setState({counter: this.state.counter + 1 });
    decrement = () => {
        // only can decrease the count if greater than 0 
        if (this.state.counter > 0){
            this.setState({counter: this.state.counter - 1});
>>>>>>> bdac7778fa875dbd5c8d391963d8f4c8d25c548c
        }
    }

    render(){
        return(
            <Fragment>
<<<<<<< HEAD
                <div className='all'>                        
                    <button onClick={this.increment }>+</button>
                    <h1 onClick={(e) => console.log('click', e)}>Contador: {this.state.counter}</h1>
                    <button onClick={this.decrement }>-</button>
=======
                <div>                        
                    <button onClick={this.increment}>+</button>
                    <h1>Contador: {this.state.counter}</h1>
                    <button onClick={this.decrement}>-</button>
>>>>>>> bdac7778fa875dbd5c8d391963d8f4c8d25c548c
                </div>
            </Fragment>
        );
    }
}

export default Counter;