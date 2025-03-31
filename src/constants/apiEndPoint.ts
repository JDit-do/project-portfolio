export const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api`;

export const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
};

export const APIEndpoints = {
  navigation: {
    gnb: {
      method: METHOD.GET,
      url: `${baseUrl}/gnb`
    }
  }
} as const;
