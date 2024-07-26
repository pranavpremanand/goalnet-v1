"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/utils/validationSchema";
import { SpinnerContext } from "@/components/SpinnerContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "@/apiCalls";

const Login = () => {
  const { isLoading, setIsLoading } = useContext(SpinnerContext);
  const [showPw, setShowPw] = useState(false);
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

  // do login
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await login(values).then((res) => res.json());
      if (response.success) {
        toast.success(response.message);
        router.replace("/admin");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
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
    <div className="bg-gradient-radial from-gray-900 to-black grow flex items-center">
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
              className="px-3 py-2 text-black outline-none border-primary rounded-full border"
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
            <div className="flex px-3 gap-2 items-center bg-white rounded-full border border-primary">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full py-2 text-black outline-none rounded-full"
                {...register("password")}
                disabled={isLoading}
              />
              <div className="text-black text-2xl w-fit cursor-pointer">
                {showPw ? (
                  <FaEye onClick={() => setShowPw(false)} />
                ) : (
                  <FaEyeSlash onClick={() => setShowPw(true)} />
                )}
              </div>
            </div>
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
