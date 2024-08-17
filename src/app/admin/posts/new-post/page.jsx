"use client";
import { createPost, getCategories } from "@/apiCalls";
import AddCategoryFormModal from "@/components/AddCategoryFormModal";
import Loading from "@/components/Loading";
import { SpinnerContext } from "@/components/Providers";
import { setCategories } from "@/lib/redux/storeSlice";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PiCaretRightBold, PiPlusBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const NewPost = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.store);
  const { error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories({ includeDeleted: false });
      const data = await response.json();
      dispatch(setCategories(data.categories));
      return data;
    },
    refetchOnWindowFocus: true,
  });
  const [imgPreview, setImgPreview] = useState("");
  const { setIsLoading } = useContext(SpinnerContext);
  const imgInputRef = useRef(null);
  // const [link, setLink] = useState("");
  // const [otherLinks, setOtherLinks] = useState([]);
  // const [linkError, setLinkError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      heading: "",
      content: "",
      categories: [],
      image: "",
      isBanner: false,
    },
  });

  if (error)
    return (
      <div className="wrapper grow flex items-center justify-center flex-col gap-2">
        <p className="text-2xl">
          Failed to load categories. Try reloading the page
        </p>
        <a className="secondary-btn" href="/admin/posts/new-post">
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
        // toast.error("Please select a valid image file (jpg, jpeg, png, webp)");
        setError("image", {
          message: "Please select a valid image file (jpg, jpeg, png, webp)",
        });
        return;
      }

      if (selectedFile.size > maxSize) {
        // toast.error("File size should be less than 5 MB");
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
    setValue("image", "");
    setImgPreview("");
    setError("image", { message: "Image is required" });
  };

  // submit form
  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", values.image);
      formData.append("upload_preset", "goalnet");

      const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.secure_url) {
        const newData = {
          ...values,
          heading: values.heading.trim(),
          content: values.content.trim(),
          image: result.secure_url,
          categories: selectedCategories,
        };
        const response = await createPost(newData).then((res) => res.json());
        if (response.success) {
          toast.success(response.message);
          reset();
          setSelectedCategories([]);
          setImgPreview("");
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Image upload failed. Please try again");
      }
    } catch (err) {
      console.log(err);
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

  // const onLinkChange = (e) => {
  //   const { value } = e.target;
  //   setLink(value);

  //   const pattern = new RegExp(
  //     "^(https?:\\/\\/)?" + // protocol
  //       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //       "(\\:\\d+)?" + // port
  //       "(\\/[-a-z\\d%_.~+]*)*" + // path
  //       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //       "(\\#[-a-z\\d_]*)?$",
  //     "i"
  //   ); // fragment locator
  //   if (pattern.test(value)) {
  //     setLinkError("");
  //     return;
  //   }
  //   setLinkError("Link is not valid");
  // };

  // const addLink = () => {
  //   if (!link) {
  //     setLinkError("Link is required");
  //     return;
  //   }
  //   if (!otherLinks.includes(link) && !linkError) {
  //     setOtherLinks([...otherLinks, link]);
  //     setLink("");
  //     setLinkError("");
  //   } else {
  //     setLinkError("Link already exists");
  //   }
  // };

  return (
    <section className="wrapper grow">
      <div className="flex items-center gap-1 mb-10">
        <Link href="/admin" className="text-md">
          Home
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link href="/admin/posts" className="text-md">
          Posts
        </Link>
        <PiCaretRightBold className="text-sm mt-[.15rem]" />
        <Link
          href="/admin/posts/new-post"
          className="text-md text-primary"
        >
          New Post
        </Link>
      </div>

      <h1 className="text-2xl font-bold tracking-wider text-center mb-5">
        Upload A New Post
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
                  alt="uploaded image"
                  width={1000}
                  height={1000}
                  className="h-full rounded-md backdrop-blur-3xl object-contain"
                />
              </div>
              <button
                className="secondary-btn w-fit mt-2"
                onClick={resetImgData}
              >
                Cancel
              </button>
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
            {categories.map((category) => (
              <button
                type="button"
                className={`${
                  selectedCategories.includes(category._id)
                    ? "bg-[#191919] text-white"
                    : "bg-blue-gray-100 text-[#191919]"
                } rounded-full px-3 py-2 text-sm`}
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
              >
                {category.name}
              </button>
            ))}
            <button
              type="button"
              className="text-white bg-[#191919] rounded-full w-[2.2rem] h-[2.2rem] flex justify-center items-center"
              onClick={() => setShowFormModal(true)}
            >
              <PiPlusBold />
            </button>
          </div>
          {/* <select
            name=""
            id=""
            className="bg-white text-black p-3"
            {...register("category")}
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select> */}
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

        <button
          disabled={isLoading}
          type="submit"
          className="primary-btn"
          onClick={validateValues}
        >
          Submit
        </button>
      </form>
      {showFormModal && (
        <AddCategoryFormModal closePopup={() => setShowFormModal(false)} />
      )}
    </section>
  );
};

export default NewPost;
