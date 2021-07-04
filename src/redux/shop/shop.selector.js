import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectIsCollectionsLoading = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector([selectShop], (shop) =>
  !!shop.collections ? true : false
);

export const selectCollectionsErrorMessage = createSelector(
  [selectShop],
  (shop) => shop.errorMessage
);

/**
 * Returns array of collection objects
 */
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

/**
 * Must be memoized since since collectionUrlParam is passed in from collection component's
 * mapStateToProps running whenever our state changes
 */
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);
