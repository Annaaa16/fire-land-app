import { useEffect, useRef, useState } from 'react';

const useCompareNode = (comparedClass: string) => {
  const [isNodeEqual, setIsNodeEqual] = useState<boolean>(false);

  const elRef = useRef<HTMLDivElement>(null);

  // Compare class of previous node with current node
  useEffect(() => {
    const prevNode = elRef.current!.previousSibling as HTMLElement;

    setIsNodeEqual(prevNode?.classList.contains(comparedClass));
  }, [comparedClass]);

  return { isNodeEqual, elRef, compared: comparedClass };
};

export default useCompareNode;