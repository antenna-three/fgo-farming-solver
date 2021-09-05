/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/result',
                destination: '/farming/result',
                permanent: true
            },
            {
                source: '/results/:id',
                destination: '/farming/results/:id',
                permanent: true
            }
        ]
    }
}
module.exports = nextConfig