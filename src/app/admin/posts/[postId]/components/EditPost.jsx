"use client";
import { useContext, useRef, useState } from "react";
import { SpinnerContext } from "@/components/Providers";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  changePostVisibility,
  deletePost,
  getPostById,
  unhidePostAndItsCategories,
  updatePost,
} from "@/apiCalls";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PiPlusBold } from "react-icons/pi";
import PopupWrapper from "@/components/PopupWrapper";
import AddCategoryFormModal from "@/components/AddCategoryFormModal";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "@/lib/redux/storeSlice";
import Loading from "@/app/loading";

const EditPost = ({ postId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { categories } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState("");
  const { isLoading: loading, setIsLoading } = useContext(SpinnerContext);
  const [pending, setPending] = useState(false);
  const imgInputRef = useRef(null);
  const pathname = usePathname();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDeletePostAlert, setShowDeletePostAlert] = useState(false);
  const [showPostVisibilityAlert, setShowPostVisibilityAlert] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [post, setPost] = useState({});
  const [hiddenCategoryNames, setHiddenCategoryNames] = useState([]);
  const [
    showUnhidePostAndItsCategoriesAlert,
    setShowUnhidePostAndItsCategoriesAlert,
  ] = useState(false);
  //   const [link, setLink] = useState("");
  //   const [otherLinks, setOtherLinks] = useState([]);
  //   const [linkError, setLinkError] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      id: postId,
      heading: "",
      content: "",
      categories: "",
      image: "",
      isBanner: false,
    },
  });

  const { error, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await getPostById(postId);
      const data = await response.json();
      dispatch(setCategories(data.categories));
      const postData = data.data;
      setPost(postData);
      setValue("heading", postData.heading);
      setValue(
        "categories",
        postData.categories.map((c) => c._id)
      );
      setSelectedCategories(postData.categories.map((c) => c._id));
      setValue("content", postData.content);
      setValue("isBanner", postData.isBanner);
      setValue("image", postData.image);
      setImgPreview(postData.image);
      return data;
    },
    refetchOnWindowFocus: true,
  });

  if (error)
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">
          Failed to load categories. Try reloading the page
        </p>
        <a className="secondary-btn" href={pathname}>
          Reload
        </a>
      </div>
    );

  if (isLoading) return <Loading />;

  if (categories.length === 0)
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">
          No categories found. Create a category before creating a post
        </p>
        <a className="secondary-btn" href="/admin/categories">
          Categories
        </a>
      </div>
    );

  // on image change
  const onImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (selectedFile) {
      if (!validTypes.includes(selectedFile.type)) {
        setError("image", {
          message: "Please select a valid image file (jpg, jpeg, png, webp)",
        });
        return;
      }

      if (selectedFile.size > maxSize) {
        setError("image", { message: "File size should be less than 5 MB" });
        return;
      }
      setValue("image", selectedFile);
      clearErrors("image");
      setImgPreview(URL.createObjectURL(selectedFile));
    }
  };

  // reset image data
  const resetImgData = () => {
    setValue("image", post.image);
    setImgPreview(post.image);
  };

  // select clicked category
  const handleCategorySelect = (newCategory) => {
    if (selectedCategories.length === 5) {
      setError("categories", {
        message: "Cannot select more than 5 categories",
      });
      return;
    }
    if (!selectedCategories.includes(newCategory)) {
      clearErrors("categories");
      setSelectedCategories([...selectedCategories, newCategory]);
    } else {
      let filteredCategories = selectedCategories.filter(
        (c) => c !== newCategory
      );
      setSelectedCategories(filteredCategories);
      if (filteredCategories.length === 0) {
        setError("categories", {
          message: "Please select at least one category",
        });
      }
    }
  };

  // submit form
  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (values.image !== post.image) {
        const formData = new FormData();
        formData.append("file", values.image);
        formData.append("upload_preset", "goalnet");

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (result.secure_url) {
          values.image = result.secure_url;
        } else {
          toast.error("Image upload failed. Please try again");
        }
      }

      values.categories = selectedCategories;

      const newData = {
        ...values,
        heading: values.heading.trim(),
        content: values.content.trim(),
      };
      const response = await updatePost(newData).then((res) => res.json());
      if (response.success) {
        if (values.isBanner) {
          queryClient.invalidateQueries(["banners"]);
          queryClient.refetchQueries(["banners"]);
        }
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // check whether the image and categories are selected
  const validateValues = () => {
    if (!getValues("image")) {
      setError("image", { message: "Image is required" });
    }
    if (selectedCategories.length === 0) {
      setError("categories", {
        message: "Please select at least one category",
      });
    }
  };

  // handle post visibility
  const handlePostVisibility = async () => {
    setPending(true);
    try {
      const response = await changePostVisibility({
        id: post._id,
        isDeleted: !post.isDeleted,
      }).then((res) => res.json());
      if (response.success) {
        setPost({ ...post, isDeleted: !post.isDeleted });
        setShowPostVisibilityAlert(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
        if (response.hiddenCategoryNames) {
          setShowPostVisibilityAlert(false);
          setHiddenCategoryNames(response.hiddenCategoryNames);
          setTimeout(() => {
            setShowUnhidePostAndItsCategoriesAlert(true);
          }, 500);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  };

  // unhide categories along with the post
  const unhidePostWithCategories = async () => {
    setIsLoading(true);
    try {
      const response = await unhidePostAndItsCategories({ id: post._id }).then(
        (res) => res.json()
      );
      if (response.success) {
        toast.success(response.message);
        setShowUnhidePostAndItsCategoriesAlert(false);
        setPost({ ...post, isDeleted: false });
        setSelectedCategories(
          selectedCategories.map((c) => (c.isDeleted = false))
        );
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // delete this post
  const handleDeletePost = async () => {
    try {
      setPending(true);
      const response = await deletePost(post._id).then((res) => res.json());
      if (response.success) {
        toast.success(response.message);
        router.push("/admin/posts");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  };

  //   const onLinkChange = (e) => {
  //     const { value } = e.target;
  //     setLink(value);

  //     const pattern = new RegExp(
  //       "^(https?:\\/\\/)?" + // protocol
  //         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //         "(\\:\\d+)?" + // port
  //         "(\\/[-a-z\\d%_.~+]*)*" + // path
  //         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //         "(\\#[-a-z\\d_]*)?$",
  //       "i"
  //     ); // fragment locator
  //     if (pattern.test(value)) {
  //       setLinkError("");
  //       return;
  //     }
  //     setLinkError("Link is not valid");
  //   };

  //   const addLink = () => {
  //     if (!link) {
  //       setLinkError("Link is required");
  //       return;
  //     }
  //     if (!otherLinks.includes(link) && !linkError) {
  //       setOtherLinks([...otherLinks, link]);
  //       setLink("");
  //       setLinkError("");
  //     } else {
  //       setLinkError("Link already exists");
  //     }
  //   };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
        Edit Post
      </h1>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full lg:w-9/12 grid grid-col gap-4 mb-5 mx-auto"
      >
        <div className="grid">
          <label className="ml-1">Image</label>
          <input
            type="file"
            className="outline-none p-2 rounded-sm text-black bg-blue-gray-50"
            onChange={onImageChange}
            accept="image/jpg, image/jpeg, image/png, image/webp"
            ref={imgInputRef}
          />
          {errors.image?.message && (
            <small className="ml-2 text-yellow-500">
              {errors.image?.message}
            </small>
          )}
          {imgPreview && (
            <>
              <div
                className="w-full h-[45vh] relative mt-1"
                onClick={() => imgInputRef.current?.click()}
                style={{ backgroundImage: `url(${imgPreview})` }}
              >
                <Image
                  src={imgPreview}
                  alt="post"
                  width={1000}
                  height={1000}
                  className="h-full object-contain rounded-md backdrop-blur-3xl"
                />
              </div>
              {!post.image && (
                <button
                  className="secondary-btn w-fit mt-2"
                  onClick={resetImgData}
                >
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
        <div className="grid">
          <label className="ml-1">Heading</label>
          <textarea
            className="outline-none p-2 rounded-sm text-black"
            rows="3"
            {...register("heading", {
              required: "Heading is required",
              minLength: {
                value: 10,
                message: "Heading should be at least 10 characters",
              },
              maxLength: {
                value: 150,
                message: "Heading should be less than 150 characters",
              },
              validate: (val) =>
                val.trim() === "" ? "Heading is required" : true,
            })}
          />
          {errors.heading?.message && (
            <small className="ml-2 text-yellow-500">
              {errors.heading?.message}
            </small>
          )}
        </div>
        <div className="grid gap-1">
          <label className="ml-1">Category</label>
          <div className="p-2 flex flex-wrap max-h-[15rem] overflow-scroll gap-3 bg-white rounded-sm">
            {categories.map((category) =>
              category.isDeleted &&
              selectedCategories.includes(category._id) ? (
                <button
                  type="button"
                  className="bg-red-600 text-secondary rounded-full px-3 py-2 text-sm"
                  key={category._id}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  {category.name}
                </button>
              ) : (
                <button
                  type="button"
                  className={`${
                    selectedCategories.includes(category._id)
                      ? "bg-secondary text-white"
                      : "bg-blue-gray-100 text-secondary"
                  } rounded-full px-3 py-2 text-sm`}
                  key={category._id}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  {category.name}
                </button>
              )
            )}
            <button
              type="button"
              className="text-white bg-secondary rounded-full w-[2.2rem] h-[2.2rem] flex justify-center items-center"
              onClick={() => setShowFormModal(true)}
            >
              <PiPlusBold />
            </button>
          </div>
          {errors.categories?.message && (
            <small className="ml-2 text-yellow-500">
              {errors.categories?.message}
            </small>
          )}
        </div>
        <div className="grid">
          <label className="ml-1">Content</label>
          <textarea
            className="outline-none p-2 rounded-sm text-black"
            rows="10"
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 500,
                message: "Content should be more than 500 characters",
              },
              validate: (val) => val.length > 0,
            })}
          />
          {errors.content?.message && (
            <small className="ml-2 text-yellow-500">
              {errors.content?.message}
            </small>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label>Set as banner</label>
          <input
            type="checkbox"
            {...register("isBanner")}
            className="accent-primary w-5 h-5 outline-none"
          />
        </div>

        {/* <div className="w-full lg:w-9/12">
          <label>Add links to content</label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  className="outline-none p-2 rounded-sm text-black w-full"
                  onChange={onLinkChange}
                  value={link}
                />
                <button
                  type="button"
                  onClick={addLink}
                  className="bg-primary h-10 w-10 text-black text-3xl flex justify-center items-center"
                >
                  <BiPlus />
                </button>
              </div>
              {linkError && (
                <small className="ml-2 text-yellow-500">{linkError}</small>
              )}
            </div>
            {otherLinks.map((link) => (
              <div key={link} className="flex items-center">
                <div className="bg-blue-gray-50 p-2 rounded-sm text-black w-full">
                  {link}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setOtherLinks(otherLinks.filter((item) => item !== link))
                  }
                  className="bg-primary h-10 w-10 text-black text-3xl flex justify-center items-center"
                >
                  <BiMinus />
                </button>
              </div>
            ))}
          </div>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 w-full">
          <button
            disabled={isLoading}
            type="submit"
            className="primary-btn w-full col-span-2 md:col-span-4"
            onClick={validateValues}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowDeletePostAlert(true)}
            className="default-btn-styles w-full bg-red-600 text-black border-red-600 hover:bg-red-400 hover:border-red-400 md:col-span-2"
          >
            Delete Post
          </button>
          <button
            type="button"
            onClick={() => setShowPostVisibilityAlert(true)}
            className={`${
              post.isDeleted
                ? "bg-green-600 border-green-600 hover:bg-green-400 hover:border-green-400"
                : "bg-yellow-600 border-yellow-600 hover:bg-yellow-400 hover:border-yellow-400"
            } default-btn-styles w-full text-black md:col-span-2`}
          >
            {post.isDeleted ? "Unhide" : "Hide"} Post
          </button>
        </div>

        {showDeletePostAlert && (
          <DeletePostAlert
            closePopup={() => setShowDeletePostAlert(false)}
            handleDeletePost={handleDeletePost}
            isLoading={pending}
          />
        )}

        {showPostVisibilityAlert && (
          <VisibilityAlert
            closePopup={() => setShowPostVisibilityAlert(false)}
            handlePostVisibility={handlePostVisibility}
            isDeleted={post.isDeleted}
            isLoading={pending}
          />
        )}
      </form>
      {showFormModal && (
        <AddCategoryFormModal closePopup={() => setShowFormModal(false)} />
      )}
      {showUnhidePostAndItsCategoriesAlert && (
        <UnhidePostAndItsCategoriesAlert
          closePopup={() => setShowUnhidePostAndItsCategoriesAlert(false)}
          hiddenCategoryNames={hiddenCategoryNames}
          isLoading={loading}
          unhidePostWithCategories={unhidePostWithCategories}
        />
      )}
    </>
  );
};

export default EditPost;

// delete post alert
const DeletePostAlert = ({ closePopup, handleDeletePost, isLoading }) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Delete Confirmation!</h1>
        <p className="text-md text-gray-700 mt-2 mb-3">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handleDeletePost}
            className="default-btn-styles bg-red-700 border-red-700 text-blue-gray-50 hover:bg-red-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};

// hide or unhide the post
const VisibilityAlert = ({
  closePopup,
  handlePostVisibility,
  isDeleted,
  isLoading,
}) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Confirmation Alert!</h1>
        <p className="text-md text-gray-700 mt-2 mb-3">
          Are you sure you want to {isDeleted ? "unhide" : "hide"} this post?
          You can change it anytime.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="button"
            onClick={handlePostVisibility}
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

// unhide categories along with the post alert
const UnhidePostAndItsCategoriesAlert = ({
  closePopup,
  hiddenCategoryNames,
  isLoading,
  unhidePostWithCategories,
}) => {
  return (
    <PopupWrapper closePopup={closePopup}>
      <div className="bg-blue-gray-50 rounded-xl p-5 text-black max-w-xs">
        <h1 className="text-xl font-semibold">Confirmation Alert!</h1>
        <p className="text-md text-gray-700 mt-2 mb-3">
          Are you sure you want to unhide{" "}
          <span className="font-bold">{hiddenCategoryNames.join(", ")}</span>{" "}
          along with this post?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="default-btn-styles bg-black border-black text-blue-gray-50 hover:bg-black/90"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={unhidePostWithCategories}
            type="button"
            className="default-btn-styles bg-green-600 border-green-600 hover:bg-green-400 hover:border-green-400"
          >
            Confirm
          </button>
        </div>
      </div>
    </PopupWrapper>
  );
};
