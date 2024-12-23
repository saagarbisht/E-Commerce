import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader,EyeOff,Eye } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Form from "../components/Form";
import { useUserStore } from "../store/useUserStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const[togglePasswordVisible,setTogglePasswordVisible] = useState(false)
  const[toggleConfirmedPasswordVisible,setToggleConfirmedPasswordVisible] = useState(false)

  const {signup,loading} = useUserStore()
  function handleFormSubmit(event) {
    event.preventDefault();
    signup(formData)
  }
  return (
    <div className="flex flex-col justify-center py-6 sm:px-6 lg:px-8">
    <Form title="Create your account">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <Input
          id="name"
          value={formData.name}
          label="Full name"
          type="text"
          placeholder="Sagar Bisht"
          Logo={User}
          handleChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <Input
          id="email"
          value={formData.email}
          label="Email"
          type="email"
          placeholder="abc@gmail.com"
          Logo={Mail}
          handleChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <Input
          id="password"
          value={formData.password}
          label="Password"
          type={togglePasswordVisible ? 'text' : 'password'}
          placeholder="********"
          Logo={Lock}
          handleChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          Toggler={togglePasswordVisible ? EyeOff : Eye}
          handleToggle={() => {setTogglePasswordVisible(e => !e)}}
        />
        <Input
          id="confirmPassword"
          value={formData.confirmedPassword}
          label="Confirm Password"
          type={toggleConfirmedPasswordVisible ? 'text' : 'password'}
          placeholder="********"
          Logo={Lock}
          handleChange={(e) => {
            setFormData({ ...formData, confirmedPassword: e.target.value });
          }}
          Toggler={toggleConfirmedPasswordVisible ? EyeOff : Eye}
          handleToggle={() => {setToggleConfirmedPasswordVisible(e => !e)}}
        />
        <FormButton loading={loading} />
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Login here <ArrowRight className="inline h-4 w-4" />
        </Link>
      </p>
    </Form>
    </div>
  );
};

function FormButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          Loading...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
          Sign up
        </>
      )}
    </button>
  );
}

export default Signup;
