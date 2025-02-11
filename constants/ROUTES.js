import qs from 'qs';

const ROUTES = {
  HOME: '/',
  SEARCH: (params) =>
    `/search${qs.stringify(params, {
      addQueryPrefix: true,
      arrayFormat: 'repeat'
    })}`,

  /**
   * @function PLAYER
   * @param {Object} [params]
   * @param {number} [params.id] - The ID of the product.
   * @param {number} [params.liveId] - The live ID of the product.
   */
  PLAYER: (params = { id: undefined, liveId: undefined }) =>
    `/player${qs.stringify(params, {
      arrayFormat: 'comma',
      addQueryPrefix: true
    })}`,
  NOT_FOUND: '/404',
  VOD: (id) => `/vod/${id}`,
  RELATED: (id) => `/related/${id}`,
  GENRE: (
    params = {
      queryType: undefined,
      menuId: undefined,
      queryId: undefined
    }
  ) =>
    `/genre${qs.stringify(params, {
      arrayFormat: 'comma',
      addQueryPrefix: true
    })}`,
  USER: {
    EXCLUSIVES: '/user/exclusives',
    CERTIFICATES: '/user/certificates'
  },
  AUTH: '/auth',
  PAYMENT: (id) => `/payment${id ? '/' + id : ''}`
};

export default ROUTES;
