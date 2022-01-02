import { useRef, useState } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useCompareNode = (attr: string) => {
  const [isNodeEqual, setIsNodeEqual] = useState<boolean>(false);

  const elRef = useRef<HTMLDivElement>(null);

  // Compare class of previous node with current node
  useIsomorphicLayoutEffect(() => {
    if (!elRef.current) return;

    const prevNode = elRef.current.previousSibling;

    if (!prevNode) return;

    setIsNodeEqual((prevNode as HTMLElement).hasAttribute(attr));
  }, []);

  return { isNodeEqual, elRef };
};

export default useCompareNode;
