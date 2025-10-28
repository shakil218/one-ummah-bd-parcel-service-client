import React from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import imageUploadIcon from "../../../assets/image-upload-icon.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Register = () => {

  const {createUser} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email,data.password)
    .then(result=>{
      console.log(result.user);
      navigate("/")
    }).catch(err=>console.log(err))
  };
  return (
    <div className="card w-full max-w-sm">
      <div className="card-body">
        <h1 className="text-3xl font-extrabold">Create an Account </h1>
        <p>
          <small>Register with Profast</small>
        </p>
        <div>
          <img src={imageUploadIcon} alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.mail?.type === "required" && (
              <p className="text-red-500" role="alert">
                UserName is required
              </p>
            )}
            {errors.mail?.type === "pattern" && (
              <p className="text-red-500" role="alert">
                Only letters are allowed
              </p>
            )}
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
            <button className="btn btn-primary text-black my-2">
              Register
            </button>
            <p>
              Already have an account?
              <Link to={"/login"} className="link link-hover">
                Login
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

export default Register;
