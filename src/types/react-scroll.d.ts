declare module 'react-scroll' {
  import * as React from 'react';

  interface ScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    smooth?: boolean;
    duration?: number;
    offset?: number;
    spy?: boolean;
    exact?: boolean;
    delay?: number;
    isDynamic?: boolean;
    onClick?: () => void;
  }

  export class Link extends React.Component<ScrollLinkProps> {}

  export const animateScroll: unknown;
  export const scroller: unknown;
}
