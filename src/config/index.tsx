import { Podcast as PodcastIcon, Rss as RssIcon, Youtube } from 'lucide-react'
import { BilibiliIcon, SpotifyIcon, XYZIcon } from '@/components/icons'
import type { Site } from '@/types/app'
import type { Podcast } from '@/types/podcast'

/**
 * Site configuration.
 * Theme color, page size, default description length, SEO, favicon.
 */
export const site: Site = {
  themeColor: 'blue', // blue, pink, purple, green, yellow, orange, red
  pageSize: 10,
  defaultDescriptionLength: 120,
  favicon:
    'https://neopic2026.oss-cn-beijing.aliyuncs.com/test/Adobe%20Express%20-%20file.png',
  seo: {
    siteName: 'NeoMatrix',
    defaultTitle: 'NeoMatrix - 新矩阵',
    defaultDescription: '一个关于技术、生活与成长的播客节目。',
    defaultImage:
      'https://neopic2026.oss-cn-beijing.aliyuncs.com/test/Adobe%20Express%20-%20file.png',
    twitterHandle: '@neonity',
    locale: 'zh_CN',
  },
}

/**
 * Podcast configuration.
 * If base fields (title, description, link, cover) are empty strings,
 * they will be automatically filled from the RSS feed.
 */
export const podcast: Podcast = {
  base: {
    title: '',
    description: '',
    link: 'https://podcast-blog.neonity.cc',
    cover: '',
  },
  hosts: [
    {
      name: 'Neonity',
      link: 'https://neonity.cc',
    },
  ],
  platforms: [
    {
      name: '小宇宙',
      link: 'https://www.xiaoyuzhoufm.com/podcast/6375ba25f78beaeec3a444f0',
      icon: XYZIcon,
      colorClass: 'text-blue-500 hover:text-blue-600',
    },
    {
      name: 'Podcasts',
      link: 'https://podcasts.apple.com/cn/podcast/neonity',
      icon: PodcastIcon,
      colorClass: 'text-purple-500 hover:text-purple-600',
    },
    {
      name: 'Spotify',
      link: 'https://open.spotify.com/user/31k53kp6hgkbovg72427dya5av44',
      icon: SpotifyIcon,
      colorClass: 'text-green-500 hover:text-green-600',
    },
    {
      name: 'Bilibili',
      link: 'https://space.bilibili.com/10817325',
      icon: BilibiliIcon,
      colorClass: 'text-blue-500 hover:text-blue-600',
    },
    {
      name: 'YouTube',
      link: 'https://www.youtube.com/@neonity2025',
      icon: Youtube,
      colorClass: 'text-red-500 hover:text-red-600',
    },
    {
      name: 'RSS',
      link: 'https://feed.xyzfm.space/7duqlaufpkey',
      icon: RssIcon,
      colorClass: 'text-orange-500 hover:text-orange-600',
    },
  ],
}
