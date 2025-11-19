import { API_URL } from '@/shared/lib/notion/config';

export const baseUrl = `${API_URL}/api`;

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
  },
  projects: {
    list: {
      method: METHOD.GET,
      url: `${baseUrl}/projects`
    },
    category: {
      method: METHOD.GET,
      url: `${baseUrl}/projects/category`
    },
    content: (id: string) => ({
      method: METHOD.GET,
      url: `${baseUrl}/projects/${id}/content`
    })
  }
} as const;
