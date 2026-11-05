import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { saveFileToRepo } from '@/lib/github';
import defaultPolicies from '@/data/policies.json';

export async function GET() {
  try {
    const fullPath = path.join(process.cwd(), 'src/data/policies.json');
    const data = await fs.readFile(fullPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json(defaultPolicies);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const formattedJson = JSON.stringify(body, null, 2);

    const result = await saveFileToRepo({
      filePath: 'src/data/policies.json',
      content: formattedJson,
      commitMessage: 'Update legal policies via Studio Admin Panel',
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
