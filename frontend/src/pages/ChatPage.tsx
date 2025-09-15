import ChatWindow from '../components/Chat/ChatWindow';
import MessageInput from '../components/Chat/MessageInput';
import Header from '../components/common/Header';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <ChatWindow />
      <MessageInput />
    </div>
  );
};

export default ChatPage;
