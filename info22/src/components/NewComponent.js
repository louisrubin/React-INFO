import React, {Component, Fragment } from 'react'; 
import './Estilos.css'

class Counter extends Component {

    state = {
        counter : 0,
    }
    // clase infor 16.5.22
    constructor(props){
        super(props);   // referencia a 'Component' from react



        this.increment = this.increment.bind(this);     // hay que 'bindear' las funciones en el constructor
        this.decrement = this.decrement.bind(this);
    }
    

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
        }
    }

    render(){
        return(
            <Fragment>
                <div className='all'>                        
                    <button onClick={this.increment }>+</button>
                    <h1 onClick={(e) => console.log('click', e)}>Contador: {this.state.counter}</h1>
                    <button onClick={this.decrement }>-</button>
                </div>
            </Fragment>
        );
    }
}

export default Counter;