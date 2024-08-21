"use client";
import { createCategory } from "@/apiCalls";
import { CategorySchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PopupWrapper from "./PopupWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/lib/redux/storeSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddCategoryFormModal = ({ closePopup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.store);
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
        toast.success(response.message,{
          id: "success",
        });
        dispatch(setCategories([...categories, response.data]));
        closePopup();
      } else {
        toast.error(response.message,{
          id: "error",
        });
      }
      reset();
    } catch (err) {
      toast.error(err.message,{
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupWrapper closePopup={closePopup}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 bg-gray-400 p-6 max-w-xs w-full rounded-xl text-black"
      >
        <div className="flex flex-col">
          <label className="ml-1">Add Category</label>
          <input
            {...register("name")}
            disabled={isLoading}
            type="text"
            className="outline-none p-2 rounded-full border-black/50 text-black border w-full"
          />
          <small className="ml-2 text-black">{errors.name?.message}</small>
        </div>
        <button
          className={`${isLoading ? "disabled-btn" : "primary-btn"} w-full`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[1.35rem] text-center" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </PopupWrapper>
  );
};

export default AddCategoryFormModal;
