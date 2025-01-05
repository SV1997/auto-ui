import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { app } from "../firebase/firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form"
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formMethods = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const domain = import.meta.env.VITE_APP_DOMAIN;
  const signUpWithGoogle = async () => {
    try {
      const responseGoogle = await signInWithPopup(auth, googleProvider);
      console.log(responseGoogle)
      const additionalUserInfo = (responseGoogle as any).additionalUserInfo;
      let response;
      if (additionalUserInfo?.isNewUser) {
        response = await axios.post(`${domain}/api/v1/createuser`, { name: responseGoogle.user.displayName, email: responseGoogle.user.email, photo: responseGoogle.user.photoURL }, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
      }
      else {
        response = await axios.get(`${domain}/api/v1/getuserdata`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        })
      }
      if (response.data.msg === "user not found") {
        navigate("/login")
      }
      else {
        console.log(response.data);
        const data = { name: (response.data.name ? response.data.name : responseGoogle.user.displayName), email: (response.data.email ? response.data.email : responseGoogle.user.email), profileImage: (response.data.profileImage ? 'https://blogwebsite-1-wxmh.onrender.com/' + response.data.profileImage : responseGoogle.user.photoURL), mobileNumber: response.data.mobileNumber, status: response.data.status }
        console.log(data)
        sessionStorage.setItem('userInfo', JSON.stringify(data))
        dispatch(authLogin(data))
        navigate("/workshops")
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const signUp = async (data: any) => {
    console.log(data);
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userdata = { name: response.user.displayName, email: response.user.email }
      sessionStorage.setItem('userInfo', JSON.stringify(userdata))
      const res=await axios.post(`${domain}/api/v1/code/createuser`, { name: data.Name, email: data.email}, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res);
      
      navigate("/workshops")

    } catch (error) {
      console.log(error);
      
    }

  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">

            {/* <!--Sign in section--> */}
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign in with</p>

              <TERipple onClick={signUpWithGoogle} rippleColor="light">
                <button
                  type="button"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" x="px" y="0px" width="35" height="30" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>

                </button>
              </TERipple>

              {/* <!-- Twitter button --> */}
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {/* <!-- Twitter --> */}
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="40" viewBox="0 0 48 48">
                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                  </svg>
                </button>
              </TERipple>

              {/* <!-- Linkedin button --> */}
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {/* <!-- Linkedin --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#039be5" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </button>
              </TERipple>
            </div>

            {/* <!-- Separator between social media sign in and email/password sign in --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                Or
              </p>
            </div>
            <form onSubmit={formMethods.handleSubmit(signUp)}>
              {/* <!-- Email input --> */}
              <input
                {...formMethods.register("Name", {
                  required: true,
                  
                })}
                type="text"
                placeholder="Name"
                className="flex justify-end mb-6 border-2 w-full bg-blue-50 border-neutral-300 focus:border-primary focus:outline-none focus:ring-0 rounded-lg"
              />
              <input
                {...formMethods.register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  }
                })}
                type="email"
                placeholder="Email"
                className="flex justify-end mb-6 border-2 w-full bg-blue-50 border-neutral-300 focus:border-primary focus:outline-none focus:ring-0 rounded-lg"
              />

              {/* <!--Password input--> */}
              <div className="relative mb-6">
                <input {...formMethods.register("password", {
                                required: true,
              
                              })}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="flex justify-end mb-6 border-2 w-full bg-blue-50 border-neutral-300 focus:border-primary focus:outline-none focus:ring-0 rounded-lg"
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </span>
                            </div>
              <input
                type="password"
                placeholder="confirm password"
                className="flex justify-end mb-6 border-2 w-full bg-blue-50 border-neutral-300 focus:border-primary focus:outline-none focus:ring-0 rounded-lg"
              />

              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Remember me checkbox --> */}

                {/* <!--Forgot password link--> */}
              </div>

              {/* <!-- Login button --> */}
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    SignUp
                  </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  );
}