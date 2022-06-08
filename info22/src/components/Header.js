import { Component } from 'react';
import "./Estilos.css";

class Header extends Component {
    render(){
        return (
            <>
                <div className='header'>
                    <h1>React & Material-UI Sample Application</h1>
                    <input className='search' placeholder='Search for Courses'/>
                </div>

            </>
        )
    }
}

export default Header;