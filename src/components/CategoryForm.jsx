"use client";
import { CategorySchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SpinnerContext } from "./SpinnerContext";
import { createCategory } from "@/apiCalls";

const CategoryForm = ({ refetchData }) => {
  const [showForm, setShowForm] = useState(false);
  const { isLoading, setIsLoading } = useContext(SpinnerContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
  });

  // create category
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await createCategory(values).then((res) => res.json());
      if (response.success) {
        toast.success(response.message);
        refetchData();
      } else {
        toast.error(response.message);
      }
      reset();
    } catch (err) {
      console.log(err, "ERR");
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-end justify-center gap-5 my-8">
      {!showForm && (
        <button className="primary-btn w-fit" onClick={() => setShowForm(true)}>
          Add Category
        </button>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-[60%] lg:w-[35%] flex flex-col gap-3 items-center"
        >
          <div className="flex flex-col w-full">
            <label
              htmlFor="name"
              className={`ml-2 ${errors.name && "text-yellow-500"}`}
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter category name"
              className="px-3 py-2 text-black outline-none focus:border-primary rounded-md border border-black"
              {...register("name")}
              disabled={isLoading}
            />
            <small className="ml-2 text-yellow-500">
              {errors.name?.message}
            </small>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              className="secondary-btn w-full"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className={`${isLoading ? "disabled-btn" : "primary-btn"} w-full`}
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-[1.35rem] text-center" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CategoryForm;
