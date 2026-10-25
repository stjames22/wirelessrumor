import { NextResponse } from 'next/server';
import { readDiscussionMessages } from '../../../lib/discussions';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await readDiscussionMessages(1);
    return NextResponse.json({ status: 'ok', discussions: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ status: 'unavailable', discussions: false }, { status: 503 });
  }
}
