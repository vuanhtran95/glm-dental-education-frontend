import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Skeleton } from 'antd';
import { Message, Role } from '../../../pages/chat';
import LoadingIcon from '../skeleton';

interface Props {
  dialog: Message[];
  isLoading: boolean;
}

const ChatBox = ({ dialog, isLoading }: Props) => {
  return (
    <>
      {isLoading && <LoadingIcon />}
      <div
        id='scrollableDiv'
        style={{
          height: 650,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={dialog.length}
          next={() => {}}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          scrollableTarget='scrollableDiv'
          hasMore={false}
          inverse={false}
        >
          <List
            dataSource={dialog}
            renderItem={(message: Message) => (
              <List.Item
                style={{
                  display: 'flex',
                  flexDirection:
                    message.role === Role.USER ? 'row-reverse' : 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '600px',
                  }}
                >
                  <div style={{ textAlign: 'left' }}>{message.content}</div>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ChatBox;
