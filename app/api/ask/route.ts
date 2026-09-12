import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'The Rumor Machine is currently offline.' },
    {
      status: 503,
      headers: {
        'Cache-Control': 'no-store',
        'Retry-After': '3600',
      },
    },
  );
}
