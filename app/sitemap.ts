import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zedtunes.com';

  // In production, fetch dynamic routes from DB
  // const songs = await prisma.song.findMany();
  // const songUrls = songs.map(song => ({ url: `${baseUrl}/song/${song.slug}`, lastModified: song.updatedAt }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/genres`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/song/blinding-lights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
       url: `${baseUrl}/song/starboy`,
       lastModified: new Date(),
       changeFrequency: 'weekly',
       priority: 0.7,
     }
  ];
}
