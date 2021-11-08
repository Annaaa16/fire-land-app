// clsx
import clsx from 'clsx';

import WidgetsSuggest from './WidgetsSuggest';
import WidgetsGroups from './WidgetsGroups';
import WidgetsFooter from './WidgetsFooter';

function NewsFeedWidgets() {
  return (
    <div className={clsx('hidden lg:block w-1/3')}>
      <WidgetsSuggest />
      <WidgetsGroups />
      <WidgetsFooter />
    </div>
  );
}

export default NewsFeedWidgets;
