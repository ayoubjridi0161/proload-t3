import { NextResponse } from 'next/server';
import { getPosts } from '~/lib/data'; // adjust the import path if needed

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;

  try {
    const data = await getPosts(page);
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error in /api/posts:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}