const Slider = ({ data }) => (
    <div>
      <div className="slider">
        <div className="slide-track">
          {data.map((item, index) => (
            <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} alt='cover art'/>
          ))}
        </div>
        <div className="slide-track">
          {data.map((item, index) => (
            <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} alt='cover art'/>
          ))}
        </div>
      </div>
    </div>
  );

export default Slider;