import { motion } from 'framer-motion';

const MessageInput = () => {
  return (
    <motion.div
      className="p-4 bg-white border-t border-gray-200"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <input type="text" placeholder="Type your message..." className="flex-1 bg-gray-100 border-2 border-transparent rounded-full py-3 px-5 text-gray-800 focus:outline-none focus:border-teal-500 transition duration-300" />
        <motion.button
          className="p-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white focus:outline-none focus:shadow-outline transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voice Input"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7v0a7 7 0 01-7-7v0m14 0V9a3 3 0 00-3-3H8a3 3 0 00-3 3v2m14 0a2 2 0 01-2 2H7a2 2 0 01-2-2m14 0h-2.5M5 11h2.5" />
          </svg>
        </motion.button>
        <motion.button
          className="p-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white focus:outline-none focus:shadow-outline transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Download Data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </motion.button>
        <motion.button
          className="p-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white focus:outline-none focus:shadow-outline transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Send Message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
