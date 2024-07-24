"use client";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/app/lib/schema";
import { SpinnerContext } from "@/app/components/SpinnerContext";

const signupUser = async (values) => {
  const response = await fetch("/api/auth/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();
  if (data.user) {
    return data.user;
  }
  throw new Error("Login failed");
};

const Login = () => {
  const { isLoading, setIsLoading } = useContext(SpinnerContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (err) {
      console.log(err, "Err");
    }
  };

  // do google signin
  const doGoogleSignin = async () => {
    // try {
    //   const response = await signIn("google", { redirect: false });
    //   console.log("response", response);
    // } catch (err) {
    //   toast.error(err.message);
    //   console.log(err, "Err");
    // }
  };
  return (
    <div className="h-[70vh] bg-gradient-radial from-gray-900 to-black">
      <div className="wrapper flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-[60%] lg:w-[35%] flex flex-col gap-3 items-center"
        >
          <h1 className="text-3xl font-bold tracking-wider uppercase">
            Admin Login
          </h1>
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className={`ml-2 ${errors.email && "text-yellow-500"}`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="px-3 py-2 text-black outline-none focus:border-primary rounded-full border border-black"
              {...register("email")}
              disabled={isLoading}
            />
            <small className="ml-2 text-yellow-500">
              {errors.email?.message}
            </small>
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="password"
              className={`ml-2 ${errors.password && "text-yellow-500"}`}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="px-3 py-2 text-black outline-none focus:border-primary rounded-full border border-black"
              {...register("password")}
              disabled={isLoading}
            />
            <small className="ml-2 text-yellow-500">
              {errors.password?.message}
            </small>
          </div>
          <button
            type="submit"
            className={`mt-4 uppercase flex justify-center w-full
              ${!isLoading ? "primary-btn" : "disabled-btn"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-[1.35rem]" />
            ) : (
              "Login"
            )}
          </button>
          {/* <button
            onClick={doGoogleSignin}
            className="secondary-btn uppercase mt-3 flex w-full justify-center items-center gap-2"
            type="button"
          >
            <Image
              src="/assets/images/google-icon.png"
              alt=""
              width={300}
              height={300}
              className="w-[1.7rem] h-[1.7rem]"
            />{" "}
            Signin with google
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
