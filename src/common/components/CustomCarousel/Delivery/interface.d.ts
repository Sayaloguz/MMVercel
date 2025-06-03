interface Item {
  game: string;
  alt: string;
  src: string;
  user: string;
  desc: string;
}

export interface CustomCarouselProps {
  items: Item[];
}
