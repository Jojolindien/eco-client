//to re-use
import { Rate } from "antd";
const Star = ({ starClick, numberOfStars }) => (
  <>
    <Rate
      onClick={() => starClick(numberOfStars)}
      value={numberOfStars}
      disabled
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
    />
    <br />
  </>
);

export default Star;
