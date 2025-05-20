

function Layout({
  name,
  image,
  experience,
  details

}) {

  return (
    <div className="card h-100 position-relative">
 

      <img src={image} className="card-img-top " alt={name}  style={{ height: '300px', objectFit: 'contain' }}/>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text flex-grow-1">Punti esperienza : {experience}</p>
         <button className="btn btn-danger" onClick={details}  >
            Dettagli
         </button>
      </div>
    </div>
  );
}

export default Layout;