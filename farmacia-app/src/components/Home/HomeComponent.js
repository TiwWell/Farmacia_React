import './HomeComponent.css';


function HomeComponent({titulo, descricao, imagemUrl, imagemAlt}) {
    return (
      <>
       <div className="home-component">
        <div className="text-side">
          <h1>{titulo}</h1>
          <p>{descricao}</p>
        </div>
        <div className="image-side">
          <img src={imagemUrl} alt="TEste" />
        </div>
      </div>
      </>
    );
  }
  
  export default HomeComponent;