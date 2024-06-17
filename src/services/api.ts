import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  },
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// // Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getHealth() {
//   try {
//     const response = await axios.get(`/health`, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     //
//   }
// }

// async function processMessage(
//   message: string,
//   dialog: Message[],
//   options: string[],
//   context: string,
//   patientName: string
// ) {
//   try {
//     const response = await axios.post(
//       `/process_message`,
//       {
//         history: [
//           {
//             role: 'system',
//             content: `
//               Now your name is ${patientName},
//               you are a dental patient, you are meeting a dentist now, have some symptom: ${
//                 options ? options.toString() : ''
//               }, let start conversation.
//             `,
//           },
//           ...dialog,
//           {
//             role: 'user',
//             content: message,
//           },
//         ],
//       },
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//         },
//       }
//     );

//     return removeTextInsideAsterisks(response.data as string);
//   } catch (error) {
//     //
//     console.error(error);
//     return '';
//   }
// }

// export { getHealth, processMessage };
