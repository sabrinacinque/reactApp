function Cell(props){
    return(
    <>
     <div className="col-3 mb-4">{props.children}</div>
    </>
    );
}

export default Cell;