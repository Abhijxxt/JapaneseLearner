import type { NextConfig } from 'next'
 
const config: NextConfig = {  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        // pathname: '/my-bucket/**',
        search: '',
        
      },
      
    ],
  },
  missingSuspenseWithCSRBailout: false,
}
 
export default config