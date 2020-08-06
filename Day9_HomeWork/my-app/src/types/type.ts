export interface Artist {
  id: number;
  link: string;
  name: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface Album {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  title: string;
  tracklist: string;
  type: string;
}

export interface Song {
  album: Album;
  artist: Artist;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: any;
  id: number;
  link: string;
  preview: string;
  rank: number;
  readable: any;
  title: string;
  title_short: string;
  title_version: string;
  type: string;
}

export interface APIResult {
  data: Song[];
  next: string;
  total: number;
}
