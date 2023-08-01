export interface Article {
    id: number,
    title: string,
    url: string,
    image_url: string,
    news_site: string,
    summary: string,
    published_at: string,
    updated_at: string,
    featured: true,
    launches: [
        {
            launch_id: string,
            provider: string
        }
    ],
    events: [
        {
            event_id: number,
            provider: string
        }
    ]
}
