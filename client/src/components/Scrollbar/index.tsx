import { useCallback } from 'react';

// types
import type { Scrollbar } from 'smooth-scrollbar/scrollbar';
import type { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

// smooth scrollbar
import SmoothScrollbar from 'smooth-scrollbar';

type ScrollbarProps = Partial<ScrollbarOptions> &
  React.PropsWithChildren<{
    className?: string;
    scrollToBottom?: boolean;
  }>;

function SmoothScrollbarReact(props: ScrollbarProps) {
  const { children, className, scrollToBottom, ...restProps } = props;

  const containerRef = useCallback(
    async (node: Scrollbar) => {
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

  return (
    <div ref={containerRef as any} className={className}>
      {children}
    </div>
  );
}

export { SmoothScrollbarReact as Scrollbar };
