import { motion } from 'framer-motion';

const MessageInput = () => {
  return (
    <motion.div
      className="p-4 bg-white border-t border-gray-200"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <input type="text" placeholder="Type your message..." className="flex-1 bg-gray-100 border-2 border-transparent rounded-full py-3 px-5 text-gray-800 focus:outline-none focus:border-teal-500 transition duration-300" />
        <motion.button
          className="ml-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-5 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Send
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
