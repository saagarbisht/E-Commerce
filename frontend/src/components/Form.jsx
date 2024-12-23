import {motion} from 'framer-motion'
const Form = ({ title,children }) => {
  return (
    <>
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut",}}
      >
        <h2 className="mt-3 text-center text-3xl font-extrabold text-emerald-400">
          {title}
        </h2>
      </motion.div>
      <motion.div
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut",}}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default Form;
