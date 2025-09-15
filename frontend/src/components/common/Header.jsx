import { motion } from 'framer-motion';
import reactLogo from '../../assets/react.svg';

const Header = () => {
  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-teal-500">FloraChat</h1>
          <div className="flex items-center">
            <span className="mr-3 font-semibold text-gray-700">John Doe</span>
            <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">JD</div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
