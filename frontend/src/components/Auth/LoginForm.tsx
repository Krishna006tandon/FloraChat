import { motion } from 'framer-motion';

const LoginForm = () => {
  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Welcome back!</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to continue to FloraChat</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 transition duration-300" id="username" type="text" placeholder="Your username" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500 transition duration-300" id="password" type="password" placeholder="Your password" />
        </div>
        <div className="flex items-center justify-between">
          <motion.button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>
        <div className="text-center mt-6">
          <a className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-teal-500" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
