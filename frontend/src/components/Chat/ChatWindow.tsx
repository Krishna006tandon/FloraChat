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
        {/* Example Messages */}
        <motion.div className="flex justify-end" variants={messageVariants}>
          <div className="bg-teal-500 text-white p-4 rounded-2xl rounded-br-lg max-w-lg">
            <p className="text-sm">Hello! Can you show me the latest temperature data from Argo float 12345?</p>
          </div>
        </motion.div>
        <motion.div className="flex justify-start" variants={messageVariants}>
          <div className="bg-white p-4 rounded-2xl rounded-bl-lg max-w-lg shadow">
            <p className="text-sm text-gray-800">Of course! Here is the latest temperature profile for float 12345.</p>
            {/* Placeholder for a chart */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mt-3"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ChatWindow;
