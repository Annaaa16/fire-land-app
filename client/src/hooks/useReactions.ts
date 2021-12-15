import { useState, useRef } from 'react';

// types
import { Reaction, User } from '@/models/common';

import { PREFIXES } from '@/constants';
import { postsActions } from '@/redux/slices/postsSlice';
import useStoreDispatch from './useStoreDispatch';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';
import useClickOutside from './useClickOutside';

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

export const emotions: { [key: string]: { type: string; icon: string } } = {
  like: { type: 'like', icon: prefix + like },
  love: { type: 'love', icon: prefix + love },
  haha: { type: 'haha', icon: prefix + haha },
  care: { type: 'care', icon: prefix + care },
  wow: { type: 'wow', icon: prefix + wow },
  sad: { type: 'sad', icon: prefix + sad },
  angry: { type: 'angry', icon: prefix + angry },
};

const useReactions = ({ postId, reaction, currentUser }: useReactionsProps) => {
  const [isOpenReactions, setIsOpenReactions] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<{
    type: string;
    icon: string;
  } | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const reactButtonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useStoreDispatch();

  const clearStartedTimeout = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  };

  const reactPost = (payload: {
    emotion: string;
    isReact: boolean;
    isUpdate: boolean;
  }) => {
    const { emotion, isReact, isUpdate } = payload;

    dispatch(
      postsActions.reactPostRequest({
        postId,
        userId: currentUser._id,
        isReact,
        emotion,
        isUpdate,
      })
    );

    clearStartedTimeout();
    setSelectedEmotion(emotions[emotion]);
    setIsOpenReactions(false);
  };

  const userActions = {
    onMouseEnter() {
      timeoutRef.current = setTimeout(() => {
        setIsOpenReactions(true);
      }, 600);
    },
    onMouseLeave() {
      clearStartedTimeout();
      setIsOpenReactions(false);
    },
    onTouchStart() {
      timeoutRef.current = setTimeout(() => {
        !isOpenReactions && setIsOpenReactions(true);
      }, 600);
    },
    onTouchEnd() {
      clearStartedTimeout();
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

  // Handle for mobile
  useClickOutside(reactButtonRef, () => {
    if (!isOpenReactions) return;

    clearStartedTimeout();
    setIsOpenReactions(false);
  });

  return {
    isOpenReactions,
    selectedEmotion,
    reactPost,
    userActions,
    reactButtonRef,
  };
};

export default useReactions;
