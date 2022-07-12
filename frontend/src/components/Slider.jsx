import ReactSlider from "react-slider"

export default function (props) {
    return (
        <ReactSlider
            className="horizontal-slider"
            marks
            markClassName="example-mark"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            {...props}
        />
    )
}