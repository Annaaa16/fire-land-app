// clsx
import clsx from 'clsx';

import WidgetsIntro from './WidgetsIntro';
import WidgetsFriendList from './WidgetsFriendList';

function WallWidgets() {
  return (
    <div className={clsx('hidden lg:block w-1/3 mr-5')}>
      <WidgetsIntro />
      <WidgetsFriendList />
    </div>
  );
}

export default WallWidgets;
