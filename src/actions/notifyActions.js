import { NOTIFY_USER } from './types';

export const notifyUser = (message, messageType) => ({ type: NOTIFY_USER, message, messageType })
