/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { 
        remotePatterns: [
            { 
                hostname: "od0dl0bkbnbt5saj.public.blob.vercel-storage.com"
            }
        ]
    }
}

module.exports = nextConfig
