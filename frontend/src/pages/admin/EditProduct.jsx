import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaImage,
  FaTags,
  FaVideo,
  FaRupeeSign,
  FaLayerGroup,
  FaWarehouse,
  FaEdit,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getSingleProduct,
  updateProduct,
} from "../../services/ProductService";

function EditProduct() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      price: "",

      category: "",

      stock: "",

      lowStockThreshold: 5,

      tags: "",

      images: "",

      videos: "",

    });

  const fetchProduct =
    async () => {

      try {

        const data =
          await getSingleProduct(
            id
          );

        const product =
          data.product;

        setFormData({

          title:
            product.title,

          description:
            product.description,

          price:
            product.price,

          category:
            product.category,

          stock:
            product.stock,

          lowStockThreshold:
            product.lowStockThreshold || 5,

          tags:
            product.tags.join(
              ", "
            ),

          images:
            product.images.join(
              ", "
            ),

          videos:
            product.videos?.join(
              ", "
            ) || "",

        });

      } catch (error) {

        toast.error(
          "Failed to fetch product"
        );

      }
    };

  useEffect(() => {

    fetchProduct();

  }, []);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        !formData.title ||

        !formData.description ||

        !formData.price ||

        !formData.category ||

        formData.stock === "" ||

        !formData.images

      ) {

        toast.error(
          "Please fill all required fields"
        );

        return;
      }

      if (
        Number(formData.stock) < 0
      ) {

        toast.error(
          "Stock cannot be negative"
        );

        return;
      }

      if (
        Number(
          formData.lowStockThreshold
        ) < 1
      ) {

        toast.error(
          "Low stock threshold must be at least 1"
        );

        return;
      }

      try {

        setLoading(true);

        const updatedData = {

          ...formData,

          price:
            Number(
              formData.price
            ),

          stock:
            Number(
              formData.stock
            ),

          lowStockThreshold:
            Number(
              formData.lowStockThreshold
            ),

          tags:
            formData.tags

              ? formData.tags
                .split(",")

                .map((tag) =>
                  tag.trim()
                )

              : [],

          images:
            formData.images

              .split(",")

              .map((img) =>
                img.trim()
              ),

          videos:
            formData.videos

              ? formData.videos
                .split(",")

                .map((video) =>
                  video.trim()
                )

              : [],
        };

        await updateProduct(
          id,
          updatedData
        );

        toast.success(
          "Product Updated Successfully"
        );

        navigate(
          "/admin/products"
        );

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Update Failed"

        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="flex items-center gap-5 mb-12">

          <div
            className="
              w-20
              h-20
              rounded-3xl
              bg-amber-100
              flex
              items-center
              justify-center
            "
          >

            <FaEdit
              className="
                text-4xl
                text-amber-500
              "
            />

          </div>

          <div>

            <h1 className="text-5xl font-extrabold text-slate-900">

              Edit Product

            </h1>

            <p className="text-slate-500 mt-3 text-lg">

              Update and manage product information

            </p>

          </div>

        </div>

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-8
            shadow-xl
          "
        >

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-8"
          >

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaBoxOpen />

                Product Title

              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="Enter product title"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-slate-700 font-semibold">

                Description

              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="6"
                placeholder="Enter product description"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
                required
              />

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaRupeeSign />

                  Price

                </label>

                <input
                  type="number"
                  name="price"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter price"
                  min="0"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition-all
                    duration-300
                  "
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaWarehouse />

                  Stock

                </label>

                <input
                  type="number"
                  name="stock"
                  value={
                    formData.stock
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter stock quantity"
                  min="0"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition-all
                    duration-300
                  "
                  required
                />

              </div>

              <div>

                <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                  <FaWarehouse />

                  Low Stock Alert

                </label>

                <input
                  type="number"
                  name="lowStockThreshold"
                  value={
                    formData.lowStockThreshold
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Low stock warning"
                  min="1"
                  className="
                    w-full
                    px-5
                    py-4
                    bg-slate-50
                    border
                    border-slate-300
                    rounded-2xl
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition-all
                    duration-300
                  "
                />

              </div>

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaLayerGroup />

                Category

              </label>

              <input
                type="text"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                placeholder="Electronics, Fashion..."
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
                required
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaTags />

                Tags

              </label>

              <input
                type="text"
                name="tags"
                value={
                  formData.tags
                }
                onChange={
                  handleChange
                }
                placeholder="nike, shoes, fashion"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaImage />

                Image URLs

              </label>

              <input
                type="text"
                name="images"
                value={
                  formData.images
                }
                onChange={
                  handleChange
                }
                placeholder="Separate image URLs with commas"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
                required
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-3 text-slate-700 font-semibold">

                <FaVideo />

                Video URLs

              </label>

              <input
                type="text"
                name="videos"
                value={
                  formData.videos
                }
                onChange={
                  handleChange
                }
                placeholder="Separate video URLs with commas"
                className="
                  w-full
                  px-5
                  py-4
                  bg-slate-50
                  border
                  border-slate-300
                  rounded-2xl
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                  transition-all
                  duration-300
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-amber-500
                hover:bg-amber-600
                text-white
                transition-all
                duration-300
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:scale-[1.02]
                shadow-lg
                hover:shadow-amber-500/30
                disabled:opacity-70
              "
            >

              {loading

                ? "Updating Product..."

                : "Update Product"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditProduct;