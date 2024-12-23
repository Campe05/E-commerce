import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const filePath = url.searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), 'public', filePath);

  try {
    const fileBuffer = await fs.promises.readFile(fullPath);
    const fileType = path.extname(fullPath).slice(1);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': `image/${fileType}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

