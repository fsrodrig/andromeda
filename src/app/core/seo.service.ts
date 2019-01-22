import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  generateTags(tags) {
    // default values
    tags = {
      title: 'Andromeda Agencia',
      // tslint:disable-next-line:max-line-length
      description: 'Porque creemos que las personas tenemos esa capacidad innata de emocionarnos  buscamos humanizar el marketing turístico',
      // tslint:disable-next-line:max-line-length
      image: 'https://firebasestorage.googleapis.com/v0/b/andromeda-landing.appspot.com/o/iSOAndromeda.png?alt=media&token=44c8127a-de71-436d-b2bc-c074a866481b',
      slug: '',
      ...tags
    };

    // Set a title
    this.titleService.setTitle(tags.title);

    // Set meta tags
    // this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    // this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
    // this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    // this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    // this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'og:site_name', content: 'Andromeda Agencia' });
    this.meta.updateTag({ name: 'og:title', content: tags.title });
    this.meta.updateTag({ name: 'og:description', content: tags.description });
    this.meta.updateTag({ name: 'og:image', content: tags.image });
    this.meta.updateTag({ name: 'og:url', content: `https://www.andromedaagencia.com/#/${tags.slug}` });
  }
}
