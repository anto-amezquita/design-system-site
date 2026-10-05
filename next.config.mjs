import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The package ships .tsx and .css source, not a build.
  transpilePackages: ['@amezquita/design-system'],
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async headers() {
    return [
      {
        source: '/:path*.md',
        headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }],
      },
      {
        source: '/:file(llms.txt|llms-full.txt)',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
