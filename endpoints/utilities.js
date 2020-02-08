import env from '../envInit'

export function logEndpoint(path) {
    if (env.LOG_ENDPOINTS) {
        console.log(`Endpoint hit: '${path}'`)
    }
}