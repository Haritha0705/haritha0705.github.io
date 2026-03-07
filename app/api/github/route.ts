import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Haritha0705';

export async function GET() {
    try {
        const currentYear = new Date().getFullYear();
        const resp = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${currentYear}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
                },
                next: { revalidate: 1800 }, // revalidate every 30 minutes
            }
        );

        if (!resp.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch GitHub contributions' },
                { status: resp.status }
            );
        }

        const data = await resp.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

