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
            <>
            <div className="Card-content">
                <div className="card">
                    <img src={cuarteto} />
                    <div className="content">
                        <h4>Server Side Rendering with React and Redux</h4>
                        <p>Build React, Redux, and React apps using Server Side Rendering (SSR), Isomorphic, and Universal JS techniques</p>
                        <a href="#">Go to course</a>
                    </div>
                    
                </div>
                <div className="card">
                    <img src={cuarteto} />
                    <div className="content">
                        <h4>Server Side Rendering with React and Redux</h4>
                        <p>Build React, Redux, and React apps using Server Side Rendering (SSR), Isomorphic, and Universal JS techniques</p>
                        <a href="#">Go to course</a>
                    </div>
                </div>
                <div className="card">
                    <img src={cuarteto} />
                    <div className="content">
                        <h4>Server Side Rendering with React and Redux</h4>
                        <p>Build React, Redux, and React apps using Server Side Rendering (SSR), Isomorphic, and Universal JS techniques</p>
                        <a href="#">Go to course</a>
                    </div>
                </div>

            </div>
            </>
        )
    }
}

export default Card;