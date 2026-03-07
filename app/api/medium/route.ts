import { NextResponse } from 'next/server';

const MEDIUM_FEED_URL = 'https://medium.com/feed/@harithawikramasinha2003';

export async function GET() {
    try {
        const resp = await fetch(MEDIUM_FEED_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
                Accept: 'application/rss+xml, application/xml, text/xml',
            },
            next: { revalidate: 3600 }, // cache for 1 hour
        });

        if (!resp.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Medium feed' },
                { status: resp.status }
            );
        }

        const xml = await resp.text();
        return new NextResponse(xml, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error fetching feed' },
            { status: 500 }
        );
    }
}

