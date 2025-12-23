import { type FC, type RefObject, useEffect } from 'react';
import { createKey } from '../../utils/fields';
import ChatItem from './ChatItem';
import type { ChatItemProps } from './utils';

const ChatList: FC<ChatListProps> = ({
  list,
  rollRef,
  backgroundColor = 'bg-slate-500',
  textColor = 'text-slate-500',
}) => {
  useEffect(() => {
    Promise.resolve()
      .then(() => {
        if (rollRef?.current)
          rollRef.current.scrollTo({
            top: rollRef.current.scrollHeight - rollRef.current.clientHeight,
            behavior: 'smooth',
          });
      })
      .catch(() => {});
  }, [list, rollRef]);

  return (
    <>
      {list.map((item, idx) => (
        <ChatItem {...item} key={createKey(idx)} />
      ))}
      <div className="flex items-center justify-center w-full my-6">
        <div className={`flex-1 h-px ${backgroundColor}`} />
        <div className={`px-4 text-sm ${textColor}`}>
          {list.length > 0 ? '到底了' : '请输入内容'}
        </div>
        <div className={`flex-1 h-px ${backgroundColor}`} />
      </div>
    </>
  );
};

export default ChatList;

interface ChatListProps {
  list: ChatItemProps[];
  backgroundColor?: string;
  rollRef?: RefObject<HTMLDivElement>;
  textColor?: string;
}
