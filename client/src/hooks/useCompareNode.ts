import { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useCompareNode = (comparedClass: string) => {
  const [isNodeEqual, setIsNodeEqual] = useState<boolean>(false);

  const elRef = useRef<HTMLDivElement>(null);

  // Compare class of previous node with current node
  useIsomorphicLayoutEffect(() => {
    const prevNode = elRef.current!.previousSibling as HTMLElement;

    setIsNodeEqual(prevNode?.classList.contains(comparedClass));
  }, [comparedClass]);

  return { isNodeEqual, elRef, compared: comparedClass };
};

export default useCompareNode;
