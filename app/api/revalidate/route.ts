// // import { revalidate } from 'lib/shopify';
// import { revalidate } from 'lib/backendUtils';
// import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';
// // export const runtime = 'nodejs'

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   return revalidate(req);
// }

// import { revalidate } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
// export const runtime = 'nodejs'

export async function POST(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({});
}
