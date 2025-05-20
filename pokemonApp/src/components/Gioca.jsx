import React from 'react'
import { Link } from 'react-router-dom'  
function Gioca(){
    //creiamo due card dove in una chiamiamo Memory e l'altra Battle    
    return(
        <div className="container my-4">
            <div className="row row-cols-1 row-cols-md-2 g-3">
                <div className="col d-flex">
                    <Link to="/gioca/memory" className="w-100 text-decoration-none ">
                        <div className="card bg-dark text-danger hover-grow">
                            <img src="/images/memory.png" alt="memory" className="card-img-top " style={{height:700  }} />
                            <div className="card-body">
                                <h5 className="card-title">Memory</h5>
                                <p className="card-text">Gioca a Memory con i Pokémon!</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col d-flex">
                    <Link to="/gioca/quiz" className="w-100 text-decoration-none hover-grow">
                        <div className="card bg-dark text-danger">
                            <img src="/images/quiz.png" alt="quiz" className="card-img-top" style={{height:700 }} />
                            <div className="card-body">
                                <h5 className="card-title">Quiz</h5>
                                <p className="card-text">Metti alla prova le tue conoscenze sui Pokémon!</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Gioca;