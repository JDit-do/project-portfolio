const URL = {
  google: {
    view: (id: string) =>
      `https://drive.google.com/file/d/${id}/view?usp=sharing`,
    download: (id: string) =>
      `https://drive.google.com/uc?id=${id}&export=download`
  }
};

export const DOCUMENT_URL = {
  resume: {
    id: '1dwhxoxSlb2q17M6L9zXXoXcatJwThz3x',
    getView() {
      return URL.google.view(this.id);
    },
    getDownload() {
      return URL.google.download(this.id);
    }
  },
  professionalProfile: {
    id: '1maALCQV5BCYW6mr1G_u9Idxx7gHn5RUf',
    getView() {
      return URL.google.view(this.id);
    },
    getDownload() {
      return URL.google.download(this.id);
    }
  },
  portfolio: {
    id: '1_Bcb9O5fwWls1UJzE1iY3PYP39EjqNEg',
    getView() {
      return URL.google.view(this.id);
    },
    getDownload() {
      return URL.google.download(this.id);
    }
  }
} as const;
