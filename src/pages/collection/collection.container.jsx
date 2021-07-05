import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";
import collectionComponent from "./collection.component";

const mapStateToProps = createStructuredSelector({
  isLoaded: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(collectionComponent);

export default CollectionsPageContainer;
