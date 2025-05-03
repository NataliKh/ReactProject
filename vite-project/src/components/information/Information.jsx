import { InformationLayout } from "./ImformationLayout.jsx";
import PropTypes from "prop-types";
export const Information = ({textInformation}) => {
  return <InformationLayout>{textInformation}</InformationLayout>;  
}

Information.propTypes = {
  textInformation: PropTypes.string,
}
