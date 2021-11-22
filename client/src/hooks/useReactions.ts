import { useState, useRef, useEffect } from 'react';

// types
import { Reaction, User } from '@/models/common';

import { PREFIXES } from '@/constants';
import { postsActions } from '@/redux/slices/postsSlice';
import useStoreDispatch from './useStoreDispatch';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

// images
import {
  like,
  haha,
  love,
  sad,
  care,
  wow,
  angry,
} from '@/utils/base64Emotions';

interface useReactionsProps {
  postId: string;
  currentUser: User;
  reaction?: Reaction;
}

const prefix = PREFIXES.BASE64_SVG;

const emotions: { [key: string]: { type: string; icon: string } } = {
  like: { type: 'like', icon: prefix + like },
  love: { type: 'love', icon: prefix + love },
  haha: { type: 'haha', icon: prefix + haha },
  care: { type: 'care', icon: prefix + care },
  wow: { type: 'wow', icon: prefix + wow },
  sad: { type: 'sad', icon: prefix + sad },
  angry: { type: 'angry', icon: prefix + angry },
};

const useReactions = ({ postId, reaction, currentUser }: useReactionsProps) => {
  const [isShowReactions, setIsShowReactions] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<{
    type: string;
    icon: any;
  } | null>(null);

  const timeoutStartId = useRef<NodeJS.Timeout>();
  const reactButtonRef = useRef<HTMLButtonElement | null>(null);
  const reactionsRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useStoreDispatch();

  const reactPost = ({
    emotion,
    isReact,
    isUpdate,
  }: {
    emotion: string;
    isReact: boolean;
    isUpdate: boolean;
  }) => {
    dispatch(
      postsActions.reactPostRequest({
        postId,
        userId: currentUser._id,
        isReact,
        emotion,
        isUpdate,
      })
    );

    setSelectedEmotion(emotions[emotion]);
    setIsShowReactions(false);

    timeoutStartId.current && clearTimeout(timeoutStartId.current);
  };

  const userActions = {
    onMouseEnter() {
      timeoutStartId.current = setTimeout(() => {
        setIsShowReactions(true);
      }, 600);
    },
    onMouseLeave() {
      setIsShowReactions(false);

      timeoutStartId.current && clearTimeout(timeoutStartId.current);
    },
    onTouchStart() {
      timeoutStartId.current = setTimeout(() => {
        !isShowReactions && setIsShowReactions(true);
      }, 400);
    },
  };

  // Set init emotion
  useIsomorphicLayoutEffect(() => {
    if (reaction) {
      setSelectedEmotion({
        type: reaction.emotion,
        icon: emotions[reaction.emotion].icon,
      });
    }
  }, [reaction]);

  // Run on mobile
  useEffect(() => {
    const handleCloseReactions = (e: TouchEvent) => {
      if (
        !isShowReactions ||
        !reactButtonRef?.current ||
        !reactionsRef?.current
      )
        return;

      if (
        !reactButtonRef.current.contains(e.target as Node) ||
        !reactionsRef.current.contains(e.target as Node)
      ) {
        setIsShowReactions(false);

        timeoutStartId.current && clearTimeout(timeoutStartId.current);
      }
    };

    document.addEventListener('touchstart', handleCloseReactions);

    return () => {
      document.removeEventListener('touchstart', handleCloseReactions);
    };
  }, [isShowReactions]);

  return {
    isShowReactions,
    selectedEmotion,
    reactPost,
    userActions,
    reactButtonRef,
    reactionsRef,
  };
};

export { emotions };

export default useReactions;
