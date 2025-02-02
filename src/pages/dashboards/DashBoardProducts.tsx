import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../store/api";

const DashBoardProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    model: "",
    price: 0,
    category: "",
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(newProduct).unwrap();
      setNewProduct({
        name: "",
        brand: "",
        model: "",
        price: 0,
        category: "",
        stock: 0,
      });
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand} - {product.model}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-orange-500 hover:text-orange-900 mr-3">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  value={newProduct.brand}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, brand: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <input
                  type="text"
                  value={newProduct.model}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, model: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select category</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Tablets">Tablets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardProducts;
