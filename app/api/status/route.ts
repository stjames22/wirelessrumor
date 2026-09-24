import { NextResponse } from 'next/server';
import { aiConfigured } from '../../../lib/service-status';

export const dynamic = 'force-dynamic';

export function GET() {
  // Configuration is not proof of upstream availability; the UI says exactly that.
  return NextResponse.json({ aiConfigured: aiConfigured() }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
