import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
  selectCollections,
  selectIsCollectionsLoaded,
  selectIsCollectionsLoading,
} from '../../redux/shop/shop.selector';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, loading, loaded, updateCollections }) => {
  useEffect(() => {
    updateCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={!loaded} {...props} />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) =>
  createStructuredSelector({
    loading: selectIsCollectionsLoading,
    loaded: selectIsCollectionsLoaded,
    collections: selectCollections,
  });

const mapDispatchToProps = (dispatch) => ({
  updateCollections: () => dispatch(fetchCollectionsStartAsync()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ShopPage);
