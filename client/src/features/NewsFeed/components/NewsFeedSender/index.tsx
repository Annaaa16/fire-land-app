import { useGlobalContext } from '@/contexts/GlobalContext';

import SenderArea from './SenderArea';
import SenderInput from './SenderInput';

function NewsFeedSender() {
  const { isShowSenderArea } = useGlobalContext();

  return (
    <>
      <SenderInput />
      {isShowSenderArea && <SenderArea />}
    </>
  );
}

export default NewsFeedSender;
