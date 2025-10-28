import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card w-full max-w-sm">
      <div className="card-body">
        <h1 className="text-3xl font-extrabold">Welcome Back </h1>
        <p>
          <small>Login with Profast</small>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.mail?.type === "required" && (
              <p className="text-red-500" role="alert">
                Email Address is required
              </p>
            )}
            {/* password field */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500" role="alert">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500" role="alert">
                Password must be 6 characters or longer
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black my-2">Login</button>
            <p>
              Don't have an account?
              <Link to={"/register"} className="link link-hover">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
        <div>
          <SocialLogin className="w-full"></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
