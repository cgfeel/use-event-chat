import { useEventChat } from '@event-chat/core';
import './App.css';
import ChatLayout from './components/ChatLayout';
import ExtraGuid from './components/ExtraGuid';
import Layout from './components/Layout';
import Toast from './components/toast';
import PubNoLimit from './module/PubNoLimit';
import SubNoLimit from './module/SubNoLimit';
import { toastOpen } from './utils/event';

const App = () => {
  const { emit } = useEventChat('test');
  return (
    <div className="m-auto max-w-400 p-4">
      <Toast />
      <Layout
        list={[
          <ChatLayout
            extra={
              <ExtraGuid>
                直接发型消息，无限制
                <button
                  type="button"
                  onClick={() =>
                    emit({
                      name: toastOpen,
                      detail: { title: 'test', message: 'test', duration: 0 },
                    })
                  }
                >
                  click it
                </button>
              </ExtraGuid>
            }
            footer={110}
            key="pub"
            title="pub-no-limit"
          >
            <PubNoLimit />
          </ChatLayout>,
          <ChatLayout
            extra={<ExtraGuid>直接发送信息，无限制</ExtraGuid>}
            footer={110}
            key="sub"
            title="sub-no-limit"
          >
            <SubNoLimit />
          </ChatLayout>,
        ]}
        title="Event-chat-nolimit"
      />
      <hr className="mb-4 mt-4" />
      <Layout
        list={[
          <ChatLayout
            extra={<ExtraGuid>直接发型消息，无限制</ExtraGuid>}
            footer={110}
            key="pub"
            title="pub-zod-schema"
          >
            <PubNoLimit />
          </ChatLayout>,
          <ChatLayout
            extra={<ExtraGuid>直接发送信息，无限制</ExtraGuid>}
            footer={110}
            key="sub"
            title="sub-no-limit"
          >
            <SubNoLimit />
          </ChatLayout>,
        ]}
        title="Event-chat-by-zod-schema"
      />
    </div>
  );
};

export default App;
