import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'email');

function load(name: string): Buffer {
  return fs.readFileSync(path.join(dir, name));
}

const LOGO = load('afbrandworks-logo.png');
const ICON_LINKEDIN = load('icon-linkedin.png');
const ICON_INSTAGRAM = load('icon-instagram.png');
const ICON_TWITTER = load('icon-twitter.png');
const ICON_YOUTUBE = load('icon-youtube.png');
const ICON_MEDIUM = load('icon-medium.png');

export const CID = {
  logo: 'afb-logo',
  linkedin: 'afb-linkedin',
  instagram: 'afb-instagram',
  twitter: 'afb-twitter',
  youtube: 'afb-youtube',
  medium: 'afb-medium',
} as const;

export type InlineAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
  inlineContentId: string;
};

export function inlineEmailAttachments(): InlineAttachment[] {
  return [
    { filename: 'afbrandworks-logo.png', content: LOGO, contentType: 'image/png', inlineContentId: CID.logo },
    { filename: 'icon-linkedin.png', content: ICON_LINKEDIN, contentType: 'image/png', inlineContentId: CID.linkedin },
    { filename: 'icon-instagram.png', content: ICON_INSTAGRAM, contentType: 'image/png', inlineContentId: CID.instagram },
    { filename: 'icon-twitter.png', content: ICON_TWITTER, contentType: 'image/png', inlineContentId: CID.twitter },
    { filename: 'icon-youtube.png', content: ICON_YOUTUBE, contentType: 'image/png', inlineContentId: CID.youtube },
    { filename: 'icon-medium.png', content: ICON_MEDIUM, contentType: 'image/png', inlineContentId: CID.medium },
  ];
}
