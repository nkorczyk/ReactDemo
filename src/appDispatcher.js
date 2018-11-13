import { Dispatcher } from 'flux';

export const dispatcher = new Dispatcher();

export function dispatch(action) {
    return dispatcher.dispatch(action)
};