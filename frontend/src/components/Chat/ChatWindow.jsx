import { motion } from 'framer-motion';

const ChatWindow = () => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
      <motion.div
        className="flex flex-col space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {/* Example User Message */}
        <motion.div className="flex justify-end" variants={messageVariants}>
          <div className="bg-teal-400 text-white p-4 rounded-xl rounded-br-none max-w-lg shadow-md">
            <p className="text-base">Hello! Can you show me the latest temperature data from Argo float 12345?</p>
            <span className="text-xs opacity-75 mt-1 block text-right">10:30 AM</span>
          </div>
        </motion.div>

        {/* Example AI Message */}
        <motion.div className="flex justify-start items-start space-x-2" variants={messageVariants}>
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            AI
          </div>
          <div className="bg-white p-4 rounded-xl rounded-bl-none max-w-lg shadow-md border border-gray-200">
            <p className="text-base text-gray-800">Of course! Here is the latest temperature profile for float 12345.</p>
            {/* Placeholder for a chart */}
            <div className="w-full h-64 bg-gray-100 rounded-lg mt-3 flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-300">
              <p>Chart Placeholder</p>
            </div>
            <span className="text-xs text-gray-500 mt-1 block text-left">10:31 AM</span>
          </div>
        </motion.div>

        {/* Loading Indicator Placeholder */}
        <motion.div className="flex justify-start items-start space-x-2" variants={messageVariants}>
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            AI
          </div>
          <div className="bg-white p-4 rounded-xl rounded-bl-none max-w-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatWindow;
