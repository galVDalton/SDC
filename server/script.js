import http from 'k6/http';

export default function () {
  const response = http.get('http://localhost:3400/api/videos');
  console.log(`Response status code: ${response.status}`);
}

export const options = {
  vus: 10,
  duration: '10s',
}