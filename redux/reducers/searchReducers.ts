import { ISearchState, ISearchStateValue } from '@/ts/models/SearchState';
import { ITag } from '@/ts/models/Tag.service';
import { PayloadAction } from '@reduxjs/toolkit';
import { ROOT } from '@/constants/ROOT';
import { ICountry } from '@/ts/models/Country.service';
import { IArrayBoxVoiceAndSubtitle } from '@/ts/types/ArrayBoxVoiceAndSubtitle';
import CATEGORIES from '@/ts/enums/CATEGORIES';
import { ISortProduct } from '@/ts/types/SortProduct';
import { IPerson } from '@/ts/models/Person.service';
import { SORT_PRODUCT_LIST } from '@/constants/SORT_PRODUCT_LIST';
import { ArrayBoxVoiceAndSubtitle } from '@/constants/voice-subtitle';
import QUERY_PARAM_STATE from '@/ts/enums/QUERY_PARAM_STATE';

const getSearchStateValueObject = (
  filterKey: keyof ISearchState['filters'],
  value: ISearchStateValue['apiId'],
  options: {
    searchStateData?: ISearchState['data'];
    chipNameOptionalValue?: ISearchStateValue['chipName'];
  } = {}
) => {
  let chipName = options.chipNameOptionalValue || value;

  switch (filterKey) {
    case 'category':
      chipName =
        value === CATEGORIES.MOVIE
          ? 'فقط فیلم ها'
          : value === CATEGORIES.SERIES
          ? 'فقط سریال ها'
          : value;
      break;

    case 'tags':
      chipName =
        options.searchStateData?.tags.find((tag) => tag.id === value)?.name ||
        '-';
      break;

    case 'persons':
      break;

    case 'countries':
      chipName =
        options.searchStateData?.countries.find(
          (country) => country.id === Number(value)
        )?.name || '-';
      break;

    case 'sounds':
    case 'subtitles':
      chipName =
        ArrayBoxVoiceAndSubtitle.find((item) => item.id === value)?.name ||
        value;
      break;

    case 'sortProductEnum':
      chipName =
        SORT_PRODUCT_LIST.find((sortItem) => sortItem.id === value)?.name ||
        value;
      break;

    case 'startYear':
      chipName = 'از سال ' + value;
      break;

    case 'endYear':
      chipName = 'تا سال ' + value;
      break;

    case 'imdbRateStart':
      chipName = 'از امتیاز ' + value;
      break;

    case 'imdbRateEnd':
      chipName = 'تا امتیاز ' + value;
      break;

    default:
      break;
  }

  return <ISearchStateValue>{
    apiId: value,
    chipName
  };
};

const deleteFilter = (
  state: ISearchState,
  filterNames: (keyof ISearchState['filters'])[]
): ISearchState => {
  let newStateFilters = { ...state.filters };
  filterNames.forEach((filterName) => delete newStateFilters[filterName]);

  return {
    ...state,
    filters: newStateFilters
  };
};

const reducerGenerals = {
  setQueryParamState: (
    state: ISearchState,
    action: PayloadAction<QUERY_PARAM_STATE>
  ) => {
    state.queryParamState = action.payload;
  },

  deleteSelectedFilters: (
    state: ISearchState,
    action: PayloadAction<(keyof ISearchState['filters'])[]>
  ) => deleteFilter(state, action.payload)
};

const reducerSharedData = {
  storeTagsList: (state: ISearchState, action: PayloadAction<ITag[]>) => {
    state.data.tags = action.payload;
  },

  storeCountriesList: (
    state: ISearchState,
    action: PayloadAction<ICountry[]>
  ) => {
    state.data.countries = action.payload;
  }
};

const searchReducers = {
  ...reducerGenerals,
  ...reducerSharedData,

  setCategory: (
    state: ISearchState,
    action: PayloadAction<CATEGORIES.MOVIE | CATEGORIES.SERIES>
  ) => {
    const newList: ISearchStateValue = getSearchStateValueObject(
      'category',
      action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        category: newList
      }
    };
  },

  toggleMobileModal: (state: ISearchState) => {
    return <ISearchState>{
      ...state,
      isOpenMobileFilter: !state.isOpenMobileFilter
    };
  },

  setSearchValue: (state: ISearchState, action: PayloadAction<string>) => {
    if (action.payload.length) {
      return <ISearchState>{
        ...state,
        searchValue: action.payload
      };
    } else {
      return (({ searchValue, ...rest }: ISearchState) => rest)(state);
    }
  },

  setTag: (
    state: ISearchState,
    action: PayloadAction<ISearchStateValue['apiId'][]>
  ) => {
    const newList = action.payload.map((item) =>
      getSearchStateValueObject('tags', item, {
        searchStateData: state.data
      })
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        tags: newList
      }
    };
  },

  deleteTagById: (state: ISearchState, action: PayloadAction<string>) => {
    const newList = state.filters.tags?.filter(
      (tag) => tag.apiId !== action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        tags: newList
      }
    };
  },

  setPerson: (state: ISearchState, action: PayloadAction<IPerson[]>) => {
    const newList = action.payload.map((item) =>
      getSearchStateValueObject('persons', item.id.toString(), {
        chipNameOptionalValue: item.name
      })
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        persons: newList
      }
    };
  },

  deletePersonById: (state: ISearchState, action: PayloadAction<number>) => {
    const newList = state.filters.persons?.filter(
      (person) => person.apiId !== action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        persons: newList
      }
    };
  },

  setCountry: (
    state: ISearchState,
    action: PayloadAction<ISearchStateValue['apiId'][]>
  ) => {
    const newList = action.payload.map((item) =>
      getSearchStateValueObject('countries', item, {
        searchStateData: state.data
      })
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        countries: newList
      }
    };
  },

  deleteCountryById: (state: ISearchState, action: PayloadAction<number>) => {
    const newList = state.filters.countries?.filter(
      (country) => country.apiId !== action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        countries: newList
      }
    };
  },

  setSound: (
    state: ISearchState,
    action: PayloadAction<IArrayBoxVoiceAndSubtitle[]>
  ) => {
    const newList = action.payload.map((item) =>
      getSearchStateValueObject('sounds', item.id)
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        sounds: newList
      }
    };
  },

  deleteSoundById: (state: ISearchState, action: PayloadAction<string>) => {
    const newList = state.filters.sounds?.filter(
      (sound) => sound.apiId !== action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        sounds: newList
      }
    };
  },

  setSubtitle: (
    state: ISearchState,
    action: PayloadAction<IArrayBoxVoiceAndSubtitle[]>
  ) => {
    const newList = action.payload.map((item) =>
      getSearchStateValueObject('subtitles', item.id)
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        subtitles: newList
      }
    };
  },

  deleteSubtitleById: (state: ISearchState, action: PayloadAction<string>) => {
    const newList = state.filters.subtitles?.filter(
      (subtitle) => subtitle.apiId !== action.payload
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        subtitles: newList
      }
    };
  },

  setSort: (state: ISearchState, action: PayloadAction<ISortProduct>) => {
    const newList: ISearchStateValue = getSearchStateValueObject(
      'sortProductEnum',
      action.payload.id
    );

    return <ISearchState>{
      ...state,
      filters: {
        ...state.filters,
        sortProductEnum: newList
      }
    };
  },

  setYear: (
    state: ISearchState,
    action: PayloadAction<{ year: string; isMin: boolean }>
  ) => {
    const { year, isMin } = action.payload;
    const LOWEST_POSSIBLE = Number(ROOT.VIDEO_MIN_PUBLISH_DATE);
    const HIGHEST_POSSIBLE = new Date().getFullYear();
    let newState: ISearchState = state;

    if (isMin) {
      const isBiggerThanLowestPossible = Number(year) > LOWEST_POSSIBLE;
      const isHighestPossibleOrBigger = Number(year) >= HIGHEST_POSSIBLE;
      const isEndYearOrBigger =
        state.filters.endYear &&
        Number(year) >= Number(state.filters.endYear.apiId);

      if (!isBiggerThanLowestPossible) {
        newState = deleteFilter(state, ['startYear']);
      } else if (isHighestPossibleOrBigger) {
        newState.filters.startYear = getSearchStateValueObject(
          'startYear',
          (HIGHEST_POSSIBLE - 1).toString()
        );
      } else if (isEndYearOrBigger) {
        newState.filters.startYear = getSearchStateValueObject(
          'startYear',
          (Number(state.filters.endYear?.apiId) - 1).toString()
        );
      } else {
        newState.filters.startYear = getSearchStateValueObject(
          'startYear',
          year
        );
      }
    } else {
      const isSmallerThanHighestPossible = Number(year) < HIGHEST_POSSIBLE;
      const isLowestPossibleOrSmaller = Number(year) <= LOWEST_POSSIBLE;
      const isStartYearOrSmaller =
        state.filters.startYear &&
        Number(year) <= Number(state.filters.startYear.apiId);

      if (!isSmallerThanHighestPossible || isLowestPossibleOrSmaller) {
        newState = deleteFilter(state, ['endYear']);
      } else if (isStartYearOrSmaller) {
        newState.filters.endYear = getSearchStateValueObject(
          'endYear',
          (Number(state.filters.startYear?.apiId) + 1).toString()
        );
      } else {
        newState.filters.endYear = getSearchStateValueObject('endYear', year);
      }
    }

    return newState;
  },

  setImdbRate: (
    state: ISearchState,
    action: PayloadAction<{ rate: string; isMin: boolean }>
  ) => {
    const { rate, isMin } = action.payload;

    const DEFAULT_MIN = '1';
    const DEFAULT_MAX = '10';

    if (isMin) {
      if (rate === DEFAULT_MIN || rate === '-1') {
        delete state.filters.imdbRateStart;
      } else {
        state.filters.imdbRateStart = getSearchStateValueObject(
          'imdbRateStart',
          rate
        );
      }
    } else {
      if (rate === DEFAULT_MAX || rate === '-1') {
        delete state.filters.imdbRateEnd;
      } else {
        state.filters.imdbRateEnd = getSearchStateValueObject(
          'imdbRateEnd',
          rate
        );
      }
    }
  },

  deleteAllFilters: (state: ISearchState) =>
    deleteFilter(state, Object.keys(state.filters) as [])
};

export default searchReducers;
