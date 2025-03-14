import cors from 'cors'
const DEFAULT_ORIGINS = ['http://localhost:8080'] // ['https://example.com', 'https://anotherdomain.com'];
export const corsMiddleware = ({ acceptedOrigins = DEFAULT_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.indexOf(origin !== -1)) {
        callback(null, acceptedOrigins)
      } else {
        callback(new Error('Error with my CORS'), null) // error, and options
      }
    }
  })
