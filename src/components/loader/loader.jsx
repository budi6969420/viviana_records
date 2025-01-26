import './index.css'

function Loader({text}) {

  return (
    <div className="loading-container">
          <div className="loader"></div>
          <p>{text}</p>
    </div>
  );
}

export default Loader;
