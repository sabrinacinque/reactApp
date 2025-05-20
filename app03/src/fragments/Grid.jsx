import Row from './Row.jsx'
import Cell from './Cell.jsx';
import Card from '../components/Card.jsx';


function Grid(props){
    return (
        <div className="container text-center">
           {props.children}
        </div>
    )

}


export default Grid