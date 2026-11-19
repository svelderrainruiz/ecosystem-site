import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Ecosystem',
      description: 'A standardized wiki for every member of the ecosystem, and what it measured.',
      sidebar: [
        { label: 'Ecosystem', link: '/ecosystem/' },
        {
          label: 'Results',
          items: [
            { label: 'What was measured', link: '/results/' },
            { slug: 'results/north-star-business-case' },
          ],
        },
        {
          label: 'Members',
          items: [
            { slug: 'members/rsr-summary' },
            { slug: 'members/labview-benchmark-actor' },
            { slug: 'members/vi-history-suite' },
            { slug: 'members/lbabus' },
            { slug: 'members/repo-standards-review-consumer-kit' },
            { slug: 'members/mprr-summary' },
          ],
        },
      ],
    }),
    mdx(),
  ],
});
