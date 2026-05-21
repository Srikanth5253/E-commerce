import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaBoxOpen,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaRupeeSign,
  FaWarehouse,
  FaChartLine,
} from "react-icons/fa";

import Navbar from "../../components/Navbar";

import {
  getProducts,
  deleteProduct,
} from "../../services/ProductService";

function Products() {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchProducts =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(
          data.products
        );

      } catch (error) {

        toast.error(
          "Failed to fetch products"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteProduct(id);

        toast.success(
          "Product deleted successfully"
        );

        fetchProducts();

      } catch (error) {
        
        toast.error(

          error.response?.data
            ?.message ||

          "Delete failed"

        );

      }
    };

  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">

        <div className="text-slate-500 text-2xl font-semibold">

          Loading...

        </div>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">

      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-12">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

          <div className="flex items-center gap-5">

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-indigo-100
                flex
                items-center
                justify-center
              "
            >

              <FaBoxOpen
                className="
                  text-4xl
                  text-indigo-500
                "
              />

            </div>

            <div>

              <h1 className="text-5xl font-extrabold text-slate-900">

                Manage Products

              </h1>

              <p className="text-slate-500 mt-3 text-lg">

                View and manage all products

              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(
                "/admin/add-product"
              )
            }
            className="
              bg-indigo-500
              hover:bg-indigo-600
              text-white
              px-7
              py-4
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              hover:shadow-indigo-500/30
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <FaPlus />

            Add Product

          </button>

        </div>

        {products.length === 0 ? (

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              p-16
              text-center
              shadow-xl
            "
          >

            <h2 className="text-4xl font-extrabold text-slate-900">

              No Products Found

            </h2>

            <p className="text-slate-500 text-lg mt-5">

              Add products to manage your ecommerce store.

            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {products.map(
              (product) => (

                <div
                  key={
                    product._id
                  }
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >

                  {/* Product Image */}

                  <div className="overflow-hidden relative">

                    <img
                      src={
                        product
                          .images?.[0]
                      }
                      alt={
                        product.title
                      }
                      className="
                        h-72
                        w-full
                        object-cover
                        hover:scale-110
                        transition-transform
                        duration-700
                      "
                    />

                    <div className="absolute top-4 left-4">

                      {product.stock === 0 ? (

                        <span
                          className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-bold
                            shadow-lg
                          "
                        >

                          Out Of Stock

                        </span>

                      ) : product.stock <=
                        product.lowStockThreshold ? (

                        <span
                          className="
                            bg-amber-500
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-bold
                            shadow-lg
                          "
                        >

                          Low Stock

                        </span>

                      ) : (

                        <span
                          className="
                            bg-green-500
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-bold
                            shadow-lg
                          "
                        >

                          In Stock

                        </span>

                      )}

                    </div>

                  </div>

                  <div className="p-6">

                    <h2
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                        line-clamp-2
                        min-h-[64px]
                      "
                    >

                      {product.title}

                    </h2>

                    <p className="text-slate-500 mt-3 font-medium">

                      {product.category}

                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <FaRupeeSign
                          className="
                            text-indigo-500
                            text-xl
                          "
                        />

                        <span className="text-indigo-600 text-3xl font-extrabold">

                          {product.price}

                        </span>

                      </div>

                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">

                      <div
                        className="
                          bg-slate-50
                          border
                          border-slate-200
                          rounded-2xl
                          p-4
                        "
                      >

                        <div className="flex items-center gap-2 mb-2">

                          <FaWarehouse
                            className="
                              text-indigo-500
                            "
                          />

                          <span className="text-sm text-slate-500">

                            Available

                          </span>

                        </div>

                        <p className="text-2xl font-bold text-slate-800">

                          {product.stock}

                        </p>

                      </div>

                      <div
                        className="
                          bg-slate-50
                          border
                          border-slate-200
                          rounded-2xl
                          p-4
                        "
                      >

                        <div className="flex items-center gap-2 mb-2">

                          <FaChartLine
                            className="
                              text-indigo-500
                            "
                          />

                          <span className="text-sm text-slate-500">

                            Sold

                          </span>

                        </div>

                        <p className="text-2xl font-bold text-indigo-600">

                          {product.sold || 0}

                        </p>

                      </div>

                    </div>

                    {product.stock > 0 &&
                      product.stock <=
                      product.lowStockThreshold && (

                        <div
                          className="
                          mt-5
                          bg-amber-50
                          border
                          border-amber-200
                          text-amber-700
                          px-4
                          py-3
                          rounded-2xl
                          font-medium
                        "
                        >

                          Only {product.stock} left in inventory.

                        </div>

                      )}


                    <div className="grid grid-cols-3 gap-4 mt-8">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/product/${product._id}`
                          )
                        }
                        className="
                          bg-indigo-500
                          hover:bg-indigo-600
                          text-white
                          py-3
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300
                          hover:scale-[1.02]
                          shadow-lg
                          hover:shadow-indigo-500/30
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <FaEye />

                        View

                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/edit-product/${product._id}`
                          )
                        }
                        className="
                          bg-amber-500
                          hover:bg-amber-600
                          text-white
                          py-3
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300
                          hover:scale-[1.02]
                          shadow-lg
                          hover:shadow-amber-500/30
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <FaEdit />

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          py-3
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300
                          hover:scale-[1.02]
                          shadow-lg
                          hover:shadow-red-500/30
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;