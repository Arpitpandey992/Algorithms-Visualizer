import ReactSlider from "react-slider";

const Slider = (props) => {
   return (
      <ReactSlider
         className="horizontal-slider"
         marks
         markClassName="example-mark"
         thumbClassName="example-thumb"
         trackClassName="example-track"
         {...props}
      />
   );
};

export default Slider;
