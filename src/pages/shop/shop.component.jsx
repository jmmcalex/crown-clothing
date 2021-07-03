import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
  // const [unsubscribeFromSnapshot, setUnsubscribeFromSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then((snapshot) => {
      const transformedCollections = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(transformedCollections);
      setLoading(false);
    });

    // setUnsubscribeFromSnapshot(
    //   collectionRef.onSnapshot(async (snapshot) => {
    //     const transformedCollections =
    //       convertCollectionsSnapshotToMap(snapshot);
    //     updateCollections(transformedCollections);
    //     setLoading(false);
    //   })
    // );

    // return () => unsubscribeFromSnapshot;
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
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

const connector = connect(null, mapDispatchToProps);
export default connector(ShopPage);
