import { createSlice } from '@reduxjs/toolkit';

// types
import { NotificationsInitState } from '@/models/notifications';
import { SocketNotification } from '@/models/common';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: NotificationsInitState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<SocketNotification>) => {
      state.notifications.unshift(action.payload);
    },

    clearNotifications: (state) => {
      state.notifications.length = 0;
    },
  },
});

export const notificationActions = notificationsSlice.actions;

export default notificationsSlice.reducer;
