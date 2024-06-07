import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/4-13',
  // todo: 토큰값도 여기서 관리하기
});

export default instance;