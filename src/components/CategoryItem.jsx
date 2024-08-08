"use client";
import { useState, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/lib/validationSchema";
import { SpinnerContext } from "./SpinnerContext";
import {
  deleteCategory,
  deleteCategoryAndPosts,
  updateCategory,
} from "@/apiCalls";
import toast from "react-hot-toast";
import PopupWrapper from "./PopupWrapper";

const CategoryItem = ({ category, refetchData }) => {
  const [editable, setEditable] = useState(false);
  const { isLoading, setIsLoading } = useContext(SpinnerContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeletePostsConfirmation, setShowDeletePostsConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  // update category
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await updateCategory({
        id: category._id,
        ...values,
      }).then((res) => res.json());

      if (response.success) {
        toast.success(response.message);
        setEditable(false);
        refetchData();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // delete category
  const handleDeleteCategory = async () => {
    setIsLoading(true);
    try {
      const response = await deleteCategory(category._id).then((res) =>
        res.json()
      );
      setShowDeleteConfirmation(false);
      if (response.success) {
        toast.success(response.message);
        refetchData();
      } else {
        toast.error(response.message);
        if (response.deletePostsConfirmation) {
          setShowDeletePostsConfirmation(true);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // delete category and posts
  const handleDeletePosts = async () => {
    setIsLoading(true);
    try {
      const response = await deleteCategoryAndPosts(category._id).then((res) =>
        res.json()
      );

      if (response.success) {
        toast.success(response.message);
        setShowDeletePostsConfirmation(false);
        refetchData();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col md:flex-row items-start gap-3 p-2 border-primary/50 border rounded-md mb-2">
        {editable ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col grow"
          >
            <input
              type="text"
              className="grow text-2xl md:text-base text-wrap line-clamp-2 mt-3 md:mt-0 outline-none bg-[#191919] p-1 rounded-sm"
              {...register("name")}
              disabled={isLoading}
            />
            <small className="ml-2 text-yellow-500">
              {errors.name?.message}
            </small>
            <div className="flex justify-start gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setEditable(false);
                  reset();
                }}
                className="px-4 py-1 md:ml-2 mt-2 text-sm md:text-[.8rem] bg-black text-blue-gray-50 hover:bg-blue-gray-50 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 md:ml-2 mt-2 text-sm md:text-[.8rem] bg-black text-primary hover:bg-primary hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <span className="grow text-2xl md:text-base text-wrap line-clamp-2 mt-3 md:mt-0">
            {category.name}
          </span>
        )}
        <div className="flex gap-2">
          {!editable && (
            <button
              onClick={() => setEditable(true)}
              className="px-4 py-1 text-sm md:text-[.8rem] bg-black text-primary hover:bg-primary hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-4 py-1 text-sm md:text-[.8rem] bg-black text-red-600 hover:bg-red-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
          >
            Delete
          </button>
        </div>
        <span className="self-start mt-1 md:self-auto text-xs md:w-[10rem] md:ml-3 text-gray-600">
          {formatDistanceToNow(category.createdAt, {
            addSuffix: true,
          })}
        </span>
      </div>
      {showDeleteConfirmation && (
        <DeleteCategoryAlert
          closePopup={() => setShowDeleteConfirmation(false)}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
      {showDeletePostsConfirmation && (
        <DeletePostsAlert
          closePopup={() => setShowDeletePostsConfirmation(false)}
          handleDeletePosts={handleDeletePosts}
        />
      )}
    </>
  );
};

export default CategoryItem;

const DeleteCategoryAlert = ({ closePopup, handleDeleteCategory }) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Delete Confirmation!</h1>
        <p className="text-sm text-gray-700 mt-2 mb-3">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCategory}
            className="default-btn-styles bg-red-700 border-red-700 text-blue-gray-50 hover:bg-red-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

const DeletePostsAlert = ({ closePopup, handleDeletePosts }) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Delete Confirmation!</h1>
        <p className="text-sm text-gray-700 mt-2 mb-3">
          Are you sure you want to delete the posts with this category? This
          action cannot be undone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            onClick={handleDeletePosts}
            className="default-btn-styles bg-red-700 border-red-700 text-blue-gray-50 hover:bg-red-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};
