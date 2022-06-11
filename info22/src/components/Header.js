import { Component } from 'react';
import "./Estilos.css";
import user_icon from "../assets/user.svg";

class Header extends Component {
    render(){
        return (
            <>
                <div className='Header'>
                    <div className='header-bg'>
                        <h1>React & Material-UI Sample Application</h1>
                        <div className='header-icons'>
                            <img src={user_icon}/>
                        </div>
                        
                    </div>
                    <div className='header-inp'>
                        <input className='search' placeholder='Search for Courses'/>
                    </div>
                </div>
                

            </>
        )
    }
}

export default Header;