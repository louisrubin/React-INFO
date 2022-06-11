import { Component } from "react";
import "./Estilos.css";
import react_redux from "../assets/ignore/React-and-Redux.jpg";
import react_cool from "../assets/ignore/react-cool.jpeg";
import react_violet from "../assets/ignore/react-violet.jpg";

    
class Card extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        return (
            <>
            <div className="whole-Cards">
                <div className="Card">
                    <img src={react_redux} />
                    <div className="Card-content">
                        <h4>Server Side Rendering with React and Redux</h4>
                        <p>Build React, Redux, and React apps using Server Side Rendering (SSR), Isomorphic, and Universal JS techniques</p>
                        <a href="#">Go to course</a>
                    </div>
                    
                </div>
                <div className="Card">
                    <img src={react_cool} />
                    <div className="Card-content">
                        <h4>React - The Complete Guide</h4>
                        <p>Dive in and learn React from scratch! Learn Reactjs, Redux, React Routing, Animations, Next.js basics and way more!</p>
                        <a href="#">Go to course</a>
                    </div>
                </div>
                <div className="Card">
                    <img src={react_violet} />
                    <div className="Card-content">
                        <h4>The complete React Web Developer Course (with Redux)</h4>
                        <p>Learn how to build and launch React web applications using React v16, Redux, Webpack, React-Router v4, and more!</p>
                        <a href="#">Go to course</a>
                    </div>
                </div>

            </div>
            </>
        )
    }
}

export default Card;