import React, {Component, Fragment } from 'react'; 

class Counter extends Component {


    // clase infor 16.5.22
    constructor(props){
        super(props);

        this.state = {
            counter: 0,
        };

        this.increment = this.increment.bind(this);     // hay que 'bindear' las funciones en el constructor
        this.decrement = this.decrement.bind(this);
    }
    

    increment = () => this.setState({counter: this.state.counter + 1 });
    decrement = () => {
        // only can decrease the count if greater than 0 
        if (this.state.counter > 0){
            this.setState({counter: this.state.counter - 1});
        }
    }

    render(){
        return(
            <Fragment>
                <div>                        
                    <button onClick={this.increment}>+</button>
                    <h1>Contador: {this.state.counter}</h1>
                    <button onClick={this.decrement}>-</button>
                </div>
            </Fragment>
        );
    }
}

export default Counter;