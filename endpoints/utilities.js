import env from '../utilities/envInit'

export function logEndpoint(path) {
    if (env.LOG_ENDPOINTS) {
        console.log(`Endpoint hit: '${path}'`)
    }
}