import { useContext } from 'react';

import { GlobalContext } from '@/contexts/GlobalContext';

import SenderArea from './SenderArea';
import SenderInput from './SenderInput';

function NewsFeedSender() {
  const { isShowSenderArea } = useContext(GlobalContext);

  return (
    <>
      <SenderInput />
      {isShowSenderArea && <SenderArea />}
    </>
  );
}

export default NewsFeedSender;
