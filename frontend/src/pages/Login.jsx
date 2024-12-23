import { useState } from "react"
import { LogIn,Mail,Lock,ArrowRight,Loader} from "lucide-react"
import Form from "../components/Form"
import Input from "../components/Input"
import { Link } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

const Login = () => {
  const [userCredentials,setUserCredentials] = useState({
    email:'',
    password:''
  })
  const {login,loading} = useUserStore()
  function handleFormSubmit(event){
    event.preventDefault()
    login(userCredentials)
  }
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <Form title="Login to your account">
      <form onSubmit={handleFormSubmit}  className="space-y-6">
      <Input
          id="email"
          value={userCredentials.name}
          label="Email"
          type="email"
          placeholder="user email"
          Logo={Mail}
          handleChange={(e) => {
            setUserCredentials({ ...userCredentials, email: e.target.value });
          }}
        />
      <Input
          id="password"
          value={userCredentials.name}
          label="Password"
          type="password"
          placeholder="********"
          Logo={Lock}
          handleChange={(e) => {
            setUserCredentials({ ...userCredentials, password: e.target.value });
          }}
        />
        <FormButton loading={loading}/>
      </form>
      <p className="mt-8 text-center text-sm text-gray-400">
        Create a new account?{" "}
        <Link
          to="/signup"
          className="font-medium text-emerald-400 hover:text-emerald-300"
        >
          Signup now <ArrowRight className="inline h-4 w-4" />
        </Link>
      </p>
    </Form>
    </div>
  )
}

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
          <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
          Log in
        </>
      )}
    </button>
  );
}

export default Login