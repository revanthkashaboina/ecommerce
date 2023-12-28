/** @type {import('next').NextConfig} */
const Data = require('./cdn.json');

const remotePatterns = Data.map((hostname) => ({
  protocol: 'https',
  hostname,
  pathname: '/**'
}));

module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true
  },
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'cdn.shopify.com',
  //       pathname: '/s/files/**'
  //     }
  //   ]
  // }
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'pickbazarlaravel.s3.ap-southeast-1.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'exceloid-image-master.s3.us-east-1.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.urbanwardrobe.in',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'wolfiekids.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.wrangler.in',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.uniprints.in',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'wolfiekids.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.glowroad.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'laxmipati.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.glowroad.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img101.urbanic.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'rukminim1.flixcart.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'rukminim2.flixcart.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'xcdn.next.co.uk',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'adn-static1.nykaa.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'imagescdn.pantaloons.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'ih1.redbubble.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.jiomart.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.bewakoof.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'image.spreadshirtmedia.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'static05.jockey.in',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'assets.ajio.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'asset1.cxnmarksandspencer.com',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 't2.gstatic.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.womenfitness.org',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.voylla.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'bodycareapparels.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'twinbirds.co.in',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'src1.ilogo.in',
        pathname: '/**'
      }
    ]
  }
};
