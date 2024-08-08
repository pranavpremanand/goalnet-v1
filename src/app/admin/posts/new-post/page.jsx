"use client";
import { createPost, fetcher } from "@/apiCalls";
import Loading from "@/components/Loading";
import { SpinnerContext } from "@/components/SpinnerContext";
import { PostSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiMinus, BiPlus } from "react-icons/bi";
import { PiCaretRightBold } from "react-icons/pi";
import useSWR from "swr";

const NewPost = () => {
  const { data, error } = useSWR({ url: `/api/category` }, fetcher);
  let categories = [];
  const [imgPreview, setImgPreview] = useState("");
  const { setIsLoading } = useContext(SpinnerContext);
  const imgInputRef = useRef(null);
  const [link, setLink] = useState("");
  const [otherLinks, setOtherLinks] = useState([]);
  const [linkError, setLinkError] = useState("");
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
    // resolver: zodResolver(PostSchema),
    defaultValues: {
      heading: "",
      content: "",
      category: "",
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

  if (!data) return <Loading />;
  categories = data.categories;

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

  setValue("category", categories[0]._id);

  const onImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 4 * 1024 * 1024; // 4 MB

    if (selectedFile) {
      if (!validTypes.includes(selectedFile.type)) {
        // toast.error("Please select a valid image file (jpg, jpeg, png, webp)");
        setError("image", {
          message: "Please select a valid image file (jpg, jpeg, png, webp)",
        });
        return;
      }

      if (selectedFile.size > maxSize) {
        // toast.error("File size should be less than 4 MB");
        setError("image", { message: "File size should be less than 4 MB" });
        return;
      }
      setValue("image", selectedFile);
      clearErrors("image");
      setImgPreview(URL.createObjectURL(selectedFile));
    }
  };

  const resetImgData = () => {
    setValue("image", "");
    setImgPreview("");
    setError("image", { message: "Image is required" });
  };

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", values.image);
      formData.append("upload_preset", "goalnet");

      const res = await fetch(process.env.CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.secure_url) {
        values.image = result.secure_url;
        console.log(values);
        const response = await createPost(values).then((res) => res.json());
        if (response.success) {
          toast.success(response.message);
          reset();
          setImgPreview("");
        } else {
          console.log(response);
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

  const validateImage = () => {
    if (!getValues("image")) {
      {
        setError("image", { message: "Image is required" });
        return;
      }
    }
  };

  const onLinkChange = (e) => {
    const { value } = e.target;
    setLink(value);

    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?" + // port
        "(\\/[-a-z\\d%_.~+]*)*" + // path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (pattern.test(value)) {
      setLinkError("");
      return;
    }
    setLinkError("Link is not valid");
  };

  const addLink = () => {
    if (!link) {
      setLinkError("Link is required");
      return;
    }
    if (!otherLinks.includes(link) && !linkError) {
      setOtherLinks([...otherLinks, link]);
      setLink("");
      setLinkError("");
    } else {
      setLinkError("Link already exists");
    }
  };

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
          className="text-md text-primary underline"
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
        <div className="grid gap-2">
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
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md backdrop-blur-3xl"
                />
              </div>
              <button className="secondary-btn w-fit" onClick={resetImgData}>
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
              maxLength: {
                value: 100,
                message: "Heading should be less than 100 characters",
              },
              validate: (val) => val.length > 0,
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
          <select
            name=""
            id=""
            className="bg-blue-gray-50 text-black p-3"
            {...register("category")}
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid">
          <label className="ml-1">Content</label>
          <textarea
            className="outline-none p-2 rounded-sm text-black"
            rows="5"
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

        <button type="submit" className="primary-btn" onClick={validateImage}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default NewPost;
