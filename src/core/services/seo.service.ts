import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  defaultTags = {
    title: 'Welcome to NgxStarter',
    description: 'This is simple boilerplate for angular',
    image: 'https://10minuteschool.com/assets/images/thumbnail/main.png',
    slug: '',
    twitter_user: '@anwaarulislaam',
    twitter_card: 'summary',
    fb_type: 'article',
    fb_user: 'anwaarulislaam',
    keywords: 'Angular Starter, Blog, Boilerplate',
  };

  constructor(private meta: Meta, private title: Title) {}

  generateTags(config: any): void {
    // default values
    config = {
      ...this.defaultTags,
      ...config,
    };

    this.title.setTitle(config.title);

    // For google
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });

    // For twitter
    this.meta.updateTag({ name: 'twitter:card', content: config.twitter_card });
    this.meta.updateTag({ name: 'twitter:site', content: config.twitter_user });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    // For Facebook
    this.meta.updateTag({ property: 'og:type', content: config.fb_user });
    this.meta.updateTag({ property: 'og:site_name', content: config.fb_user });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: config.slug });
  }

  resetMeta(): void {
    this.generateTags(this.defaultTags);
  }
}
