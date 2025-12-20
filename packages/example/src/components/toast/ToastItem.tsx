import { useEventChat } from '@event-chat/core';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC, type MouseEventHandler, useCallback, useEffect, useRef } from 'react';
import z from 'zod';
import { toastClose, toastItem as toastItemKey } from '@/utils/event';
import type { toastItem } from './utils';

const error = Object.freeze({
  bg: 'bg-red-500',
  icon: faTimesCircle,
});

const info = Object.freeze({
  bg: 'bg-blue-500',
  icon: faInfoCircle,
});

const success = Object.freeze({
  bg: 'bg-emerald-500',
  icon: faCheckCircle,
});

const warning = Object.freeze({
  bg: 'bg-amber-500',
  icon: faExclamationCircle,
});

const toastConfig = Object.freeze({
  error,
  info,
  success,
  warning,
});

const ToastItem: FC<ToastItemProps> = ({ item: { id, message, title, type } }) => {
  const { emit } = useEventChat(toastItemKey);
  const toastRef = useRef<HTMLDivElement>(null);
  const config = toastConfig[type];

  const handleToastClick = useCallback(() => {
    const wrap = toastRef.current;
    if (wrap instanceof HTMLElement) {
      wrap.classList.remove('animate-toast-in');
      wrap.classList.add('animate-toast-out');
    }
  }, []);

  const handleClose: MouseEventHandler<HTMLSpanElement> = useCallback(
    (event) => {
      event.stopPropagation();
      handleToastClick();
    },
    [handleToastClick]
  );

  useEffect(() => {
    const wrap = toastRef.current;
    function animationEndHandle() {
      if (wrap?.classList.contains('animate-toast-out')) {
        emit({ detail: { id }, name: toastClose });
      }
    }
    if (wrap instanceof HTMLElement) {
      wrap.classList.add('animate-toast-in');
      wrap.addEventListener('animationend', animationEndHandle);
    }
    return () => {
      wrap?.removeEventListener('animationend', animationEndHandle);
    };
  }, [id, emit]);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white max-w-sm w-full cursor-pointer transition-all duration-300 ${config.bg}`}
      ref={toastRef}
    >
      <FontAwesomeIcon icon={config.icon} className="text-xl w-5 text-center" />
      <div className="flex-1 text-sm font-medium">
        <div className="font-bold">{title}</div>
        {message && <div className="text-opacity-90 text-xs mt-1">{message}</div>}
      </div>
      <span className="text-sm hover:opacity-80 transition-opacity" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
};

export default ToastItem;

interface ToastItemProps {
  item: z.infer<typeof toastItem>;
}
