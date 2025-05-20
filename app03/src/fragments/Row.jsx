import Cell from './Cell.jsx';
import Card from '../components/Card.jsx';

function Row (props)
{
    return (
             <div className="row">
               {props.children}
            </div>
    );
}


export default Row;