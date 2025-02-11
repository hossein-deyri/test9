import QUERY_PARAM_STATE from '@/ts/enums/QUERY_PARAM_STATE';
import { ISearchState } from '@/ts/models/SearchState';
import { createSlice } from '@reduxjs/toolkit';
import searchReducers from 'redux/reducers/searchReducers';

const searchInitialState: ISearchState = {
  data: {
    tags: [],
    countries: []
  },
  filters: {},
  isOpenMobileFilter: false,
  queryParamState: QUERY_PARAM_STATE.UNKNOWN
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: searchReducers
});

export default searchSlice;
