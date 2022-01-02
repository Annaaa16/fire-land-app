import React, { createElement, useCallback } from 'react';

// types
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';
import type { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

// smooth scrollbar
import SmoothScrollbar from 'smooth-scrollbar';

type ScrollbarProps = Partial<ScrollbarOptions> &
  React.PropsWithChildren<{
    className?: string;
    scrollToBottom?: boolean;
    dataAttr?: string;
  }>;

function SmoothScrollbarReact(props: ScrollbarProps) {
  const { children, className, scrollToBottom, dataAttr, ...restProps } = props;

  const containerRef = useCallback(
    (node: Scrollbar) => {
      if (!(node instanceof HTMLElement)) return;

      node = SmoothScrollbar.init(node, {
        ...restProps,
        damping: 0.8,
        continuousScrolling: false,
      });

      node.update();

      if (scrollToBottom) {
        node.scrollTo(0, node.containerEl.scrollHeight);
      }
    },
    [restProps, scrollToBottom]
  );

  return createElement(
    'div',
    {
      ref: containerRef,
      className,
      [dataAttr!]: 'true',
    },
    createElement(React.Fragment, {}, children)
  );
}

export { SmoothScrollbarReact as Scrollbar };
