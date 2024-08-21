"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/lib/validationSchema";
import {
  deleteCategory,
  deleteCategoryAndPosts,
  updateCategory,
} from "@/apiCalls";
import toast from "react-hot-toast";
import PopupWrapper from "../../../../components/PopupWrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { formatTimeDifference } from "@/lib/helpers";

const CategoryItem = ({ category, dispatch, setCategories, categories }) => {
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [
    showVisibilityChangeConfirmation,
    setShowVisibilityChangeConfirmation,
  ] = useState(false);
  const [showDeletePostsConfirmation, setShowDeletePostsConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
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
        name: values.name.trim(),
      }).then((res) => res.json());

      if (response.success) {
        toast.success(response.message, {
          id: "success",
        });
        setEditable(false);
        dispatch(
          setCategories(
            categories.map((c) => (c._id === category._id ? response.data : c))
          )
        );
      } else {
        toast.error(response.message, {
          id: "error",
        });
      }
    } catch (err) {
      toast.error(err.message, {
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // delete category
  const handleChangeVisibility = async () => {
    setIsLoading(true);
    try {
      const response = await deleteCategory(category._id).then((res) =>
        res.json()
      );
      setShowVisibilityChangeConfirmation(false);
      if (response.success) {
        toast.success(response.message, {
          id: "success",
        });
        dispatch(
          setCategories(
            categories.map((c) => (c._id === category._id ? response.data : c))
          )
        );
      } else {
        toast.error(response.message, {
          id: "error",
        });
        if (response.hidePostsConfirmation) {
          setTimeout(() => {
            setShowDeletePostsConfirmation(true);
          }, 500);
        }
      }
    } catch (err) {
      toast.error(err.message, {
        id: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // delete category and posts
  const handleHidePosts = async () => {
    setIsLoading(true);
    try {
      const response = await deleteCategoryAndPosts(category._id).then((res) =>
        res.json()
      );

      if (response.success) {
        toast.success(response.message, {
          id: "success",
        });
        setShowDeletePostsConfirmation(false);
        dispatch(
          setCategories(
            categories.map((c) =>
              c._id === category._id ? { ...c, isDeleted: true } : c
            )
          )
        );
      } else {
        toast.error(response.message, {
          id: "error",
        });
      }
    } catch (err) {
      toast.error(err.message, {
        id: "error",
      });
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
              className="grow text-2xl text-secondary md:text-base text-wrap line-clamp-2 mt-3 md:mt-0 outline-none p-1 rounded-sm"
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
          {category.isDeleted ? (
            <button
              onClick={() => setShowVisibilityChangeConfirmation(true)}
              className="w-[6rem] flex items-center gap-1 px-4 py-1 text-sm md:text-[.8rem] bg-black text-red-600 hover:bg-red-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
            >
              <FaEyeSlash className="text-lg" /> Hidden
            </button>
          ) : (
            <button
              onClick={() => setShowVisibilityChangeConfirmation(true)}
              className="w-[6rem] flex items-center gap-1 px-4 py-1 text-sm md:text-[.8rem] bg-black text-green-600 hover:bg-green-600 hover:text-black tracking-wide font-semibold transition-colors duration-300 rounded-full"
            >
              <FaEye className="text-lg" /> Public
            </button>
          )}
        </div>
        <span className="self-start mt-1 md:self-auto text-xs md:w-[10rem] md:ml-3 text-gray-600">
          {formatTimeDifference(category.createdAt)}
        </span>
      </div>
      {showVisibilityChangeConfirmation && (
        <ChangeCategoryVisibilityAlert
          closePopup={() => setShowVisibilityChangeConfirmation(false)}
          handleChangeVisibility={handleChangeVisibility}
          isDeleted={category.isDeleted}
          isLoading={isLoading}
        />
      )}
      {showDeletePostsConfirmation && (
        <HidePostsAlert
          closePopup={() => setShowDeletePostsConfirmation(false)}
          handleHidePosts={handleHidePosts}
        />
      )}
    </>
  );
};

export default CategoryItem;

const ChangeCategoryVisibilityAlert = ({
  closePopup,
  handleChangeVisibility,
  isDeleted,
  isLoading,
}) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Confirmation Alert!</h1>
        <p className="text-md text-gray-700 mt-2 mb-3">
          Are you sure you want to {isDeleted ? "unhide" : "hide"} this
          category? You can change it anytime.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleChangeVisibility}
            className={`default-btn-styles text-black ${
              isDeleted
                ? "bg-green-600 border-green-600 hover:bg-green-400 hover:border-green-400"
                : "bg-yellow-600 border-yellow-600 hover:bg-yellow-700 hover:border-yellow-700"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

const HidePostsAlert = ({ closePopup, handleHidePosts }) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Confirmation Alert!</h1>
        <p className="text-md text-gray-700 mt-2 mb-3">
          Are you sure you want to hide the posts associated with this category?
          You can change it anytime.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            onClick={handleHidePosts}
            className="default-btn-styles bg-red-700 border-red-700 text-blue-gray-50 hover:bg-red-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};
