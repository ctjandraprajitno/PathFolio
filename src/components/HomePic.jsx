import left from '../assets/leftDoc.svg';
import right from '../assets/rightDoc.svg';
import example from '../assets/resume-example-1.png';
import '../styles/HomePic.css';


function HomePic() {
  return (
    <div className="home-pic-container">
      <img src={left} alt="Left decorative document" className="left" />
      <img src={example} alt="Example resume" className="middle" />
      <img src={right} alt="Right decorative document" className="right" />
    </div>
  );
}

export default HomePic;