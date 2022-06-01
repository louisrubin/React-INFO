import { Component } from "react";
import "./Estilos.css";
import cuarteto from "../assets/el-cuarteto-de-god.jpg";


const enzo = require("../assets/get-back-beatles.jpg").default;
    
class Card extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        return (
            <div className="card">
                <img src={cuarteto} />
                <h2>Server Side Rendering with React and Redux</h2>
                <p>Build React, Redux, and React apps using Server Side Rendering (SSR), Isomorphic, and Universal JS techniques</p>
                <p>Go to course</p>
            </div>
        )
    }
}

export default Card;