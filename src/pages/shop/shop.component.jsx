import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import CollectionsPageContainer from "../collection/collection.container";

const ShopPage = ({ match, updateCollections }) => {
  useEffect(() => {
    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionsPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: () => dispatch(fetchCollectionsStart()),
});

const connector = connect(null, mapDispatchToProps);
export default connector(ShopPage);
