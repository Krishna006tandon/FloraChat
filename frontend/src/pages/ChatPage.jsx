import ChatWindow from '../components/Chat/ChatWindow';
import MessageInput from '../components/Chat/MessageInput';
import Header from '../components/common/Header';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen ocean-gradient-bg"> {/* Dynamic ocean gradient background */}
      <Header />
      <main className="flex flex-1 p-4 space-x-4"> {/* Two-column layout with spacing */}
        {/* Left Column: Chat and Data Visualization */}
        <div className="flex flex-col w-2/3 h-full bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-blue-400">
          {/* Chat Section */}
          <div className="flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto"> {/* Chat Window */}
              <ChatWindow />
            </div>
            <MessageInput /> {/* Message Input */}
          </div>

          {/* Data Visualization Placeholder */}
          <div className="p-4 border-t border-blue-400">
            <h3 className="text-lg font-semibold mb-2 text-white">Data Visualization</h3>
            <div className="bg-white/10 h-64 flex items-center justify-center rounded-md">
              <p className="text-blue-200">Interactive Chart Placeholder</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Provenance
            </button>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-1/3 h-full bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-4 border border-blue-400">
          <h2 className="text-xl font-bold mb-4 text-white">Chat History / Saved Queries</h2>
          <p className="text-blue-200">Content for chat history or saved queries will go here.</p>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;