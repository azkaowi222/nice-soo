// "use client";
// import { useState, useEffect } from "react";
// import { X, Upload, ImageIcon } from "lucide-react";
// import Image from "next/image";

// export default function ProductForm({ product, onSave, onCancel }) {
//   // Fixed formData structure - sesuai dengan database schema
//   const [formData, setFormData] = useState({
//     category_id: 1,
//     name: "",
//     description: "",
//     price: "",
//     "sizes[]": [], // bracket notation untuk form submission
//     quantity: "", // changed from stock to quantity
//     status: "active",
//   });
//   const [sizesInput, setSizesInput] = useState("");
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         category_id: product.category_id || 1,
//         name: product.name || "",
//         description: product.description || "",
//         price: product.price || "",
//         "sizes[]": product.sizes || [], // handle existing sizes array
//         quantity: product.quantity || "", // changed from stock
//         "images[]": product.images || [], // handle existing images array
//         status: product.status || "active",
//       });

//       // Set existing images if editing
//       if (product.images && product.images.length > 0) {
//         setImagePreviews(
//           product.images.map((img, index) => ({
//             id: index,
//             url: img,
//             isExisting: true,
//           }))
//         );
//       }
//     }
//   }, [product]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare final data
//     const finalData = {
//       ...formData,
//       price: parseInt(formData.price),
//       quantity: parseInt(formData.quantity), // changed from stock
//       images: [], // will be populated below
//     };

//     // Handle images - combine existing and new
//     const existingImages = imagePreviews
//       .filter((img) => img.isExisting)
//       .map((img) => img.url);

//     // For new images, you might want to upload them first and get URLs
//     // For now, we'll include the files for processing
//     finalData.images = existingImages;
//     finalData.newImageFiles = imageFiles; // separate field for new files

//     onSave(finalData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle sizes input (assuming comma-separated input)
//   const handleSizesChange = (e) => {
//     const sizesValue = e.target.value;
//     const sizesKey = formData["sizes[]"];
//     if (sizesValue == ",") {
//       setFormData({
//         ...formData,
//         "sizes[]": [
//           ...sizesKey,
//           sizesValue.slice(0, sizesValue.indexOf(sizesValue)),
//         ],
//       });
//     }
//     console.log(sizesKey);
//     // console.log(formData["sizes[]"]);
//     // console.log(Array.isArray(formData["sizes[]"]));
//   };

//   const handleSizesBlur = () => {
//     const sizesArray = sizesInput
//       .split(",")
//       .map((size) => size.trim())
//       .filter((size) => size);

//     setFormData({
//       ...formData,
//       "sizes[]": sizesArray,
//     });
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);

//     if (files.length > 0) {
//       // Validate file types
//       const validFiles = files.filter(
//         (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
//       );

//       if (validFiles.length !== files.length) {
//         alert(
//           "Some files were skipped. Only image files under 5MB are allowed."
//         );
//       }

//       // Add new files to existing files
//       const newFiles = [...imageFiles, ...validFiles];
//       setImageFiles(newFiles);

//       // Create previews for new files
//       const newPreviews = validFiles.map((file, index) => ({
//         id: Date.now() + index,
//         url: URL.createObjectURL(file),
//         file: file,
//         isExisting: false,
//       }));

//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const removeImage = (imageId) => {
//     // Remove from previews
//     const updatedPreviews = imagePreviews.filter((img) => img.id !== imageId);
//     setImagePreviews(updatedPreviews);

//     // Remove from files if it's a new file
//     const imageToRemove = imagePreviews.find((img) => img.id === imageId);
//     if (imageToRemove && imageToRemove.file) {
//       const updatedFiles = imageFiles.filter(
//         (file) => file !== imageToRemove.file
//       );
//       setImageFiles(updatedFiles);

//       // Revoke object URL to prevent memory leaks
//       URL.revokeObjectURL(imageToRemove.url);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">
//           {product ? "Edit Product" : "Add New Product"}
//         </h1>
//         <p className="text-gray-600">
//           {product
//             ? "Update product information"
//             : "Fill in the details to add a new product"}
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter product name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     category_id: parseInt(e.target.value),
//                   })
//                 }
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value={1}>Electronics</option>
//                 <option value={2}>Fashion</option>
//                 <option value={3}>Home & Garden</option>
//                 <option value={4}>Sports</option>
//                 <option value={5}>Books</option>
//                 <option value={6}>Toys</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price (Rp) *
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="0"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Quantity *
//               </label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="0"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sizes
//               </label>
//               <input
//                 type="text"
//                 name="sizes"
//                 value={formData["sizes[]"].join(", ")}
//                 onChange={handleSizesChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="S, M, L, XL (comma separated)"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Enter sizes separated by commas
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter product description"
//             />
//           </div>

//           {/* Images Upload Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Images
//             </label>
//             <div className="space-y-4">
//               {/* Upload Area */}
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label
//                   htmlFor="image-upload"
//                   className="cursor-pointer flex flex-col items-center space-y-2"
//                 >
//                   <Upload className="w-8 h-8 text-gray-400" />
//                   <span className="text-sm text-gray-600">
//                     Click to upload images or drag and drop
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     PNG, JPG, GIF up to 5MB each
//                   </span>
//                 </label>
//               </div>

//               {/* Image Previews */}
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                   {imagePreviews.map((image) => (
//                     <div key={image.id} className="relative group">
//                       <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
//                         <Image
//                           src={image.url}
//                           alt="Product preview"
//                           width={300}
//                           height={300}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeImage(image.id)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                       {image.isExisting && (
//                         <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
//                           Existing
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Info Text */}
//               <div className="flex items-center space-x-2 text-sm text-gray-500">
//                 <ImageIcon className="w-4 h-4" />
//                 <span>
//                   {imagePreviews.length} image
//                   {imagePreviews.length !== 1 ? "s" : ""} selected
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               {product ? "Update Product" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function ProductForm({ product, onSave, onCancel }) {
  // Fixed formData structure - sesuai dengan database schema
  const [formData, setFormData] = useState({
    category_id: 1,
    name: "",
    description: "",
    price: "",
    "sizes[]": [], // bracket notation untuk form submission
    quantity: "", // changed from stock to quantity
    status: "active",
  });
  const [sizesInput, setSizesInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        category_id: product.category_id || 1,
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        "sizes[]": product.sizes || [], // handle existing sizes array
        quantity: product.quantity || "", // changed from stock
        "images[]": product.images || [], // handle existing images array
        status: product.status || "active",
      });

      // Set existing images if editing
      if (product.images && product.images.length > 0) {
        setImagePreviews(
          product.images.map((img, index) => ({
            id: index,
            url: img,
            isExisting: true,
          }))
        );
      }

      // Set sizes input untuk display
      if (product.sizes && Array.isArray(product.sizes)) {
        setSizesInput(product.sizes.join(", "));
      }
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare final data
    const finalData = {
      ...formData,
      price: parseInt(formData.price),
      quantity: parseInt(formData.quantity), // changed from stock
      images: [], // will be populated below
    };

    // Handle images - combine existing and new
    const existingImages = imagePreviews
      .filter((img) => img.isExisting)
      .map((img) => img.url);

    // For new images, you might want to upload them first and get URLs
    // For now, we'll include the files for processing
    finalData.images = existingImages;
    finalData.newImageFiles = imageFiles; // separate field for new files

    onSave(finalData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle sizes input (fixed version)
  const handleSizesChange = (e) => {
    const inputValue = e.target.value;
    setSizesInput(inputValue);

    // Parse comma-separated values and update formData
    const sizesArray = inputValue
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size.length > 0);

    setFormData({
      ...formData,
      "sizes[]": sizesArray,
    });
    console.log(formData["sizes[]"]);
  };

  const handleSizesBlur = () => {
    const sizesArray = sizesInput
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size);

    setFormData({
      ...formData,
      "sizes[]": sizesArray,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Validate file types
      const validFiles = files.filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
      );

      if (validFiles.length !== files.length) {
        alert(
          "Some files were skipped. Only image files under 5MB are allowed."
        );
      }

      // Add new files to existing files
      const newFiles = [...imageFiles, ...validFiles];
      setImageFiles(newFiles);

      // Create previews for new files
      const newPreviews = validFiles.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        file: file,
        isExisting: false,
      }));

      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (imageId) => {
    // Remove from previews
    const updatedPreviews = imagePreviews.filter((img) => img.id !== imageId);
    setImagePreviews(updatedPreviews);

    // Remove from files if it's a new file
    const imageToRemove = imagePreviews.find((img) => img.id === imageId);
    if (imageToRemove && imageToRemove.file) {
      const updatedFiles = imageFiles.filter(
        (file) => file !== imageToRemove.file
      );
      setImageFiles(updatedFiles);

      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {product ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-gray-600">
          {product
            ? "Update product information"
            : "Fill in the details to add a new product"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: parseInt(e.target.value),
                  })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Electronics</option>
                <option value={2}>Fashion</option>
                <option value={3}>Home & Garden</option>
                <option value={4}>Sports</option>
                <option value={5}>Books</option>
                <option value={6}>Toys</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Rp) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>
              <input
                type="text"
                name="sizes"
                value={sizesInput}
                onChange={handleSizesChange}
                onBlur={handleSizesBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="S, M, L, XL (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter sizes separated by commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Images Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB each
                  </span>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {imagePreviews.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                        <Image
                          src={image.url}
                          alt="Product preview"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {image.isExisting && (
                        <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                          Existing
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Info Text */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <ImageIcon className="w-4 h-4" />
                <span>
                  {imagePreviews.length} image
                  {imagePreviews.length !== 1 ? "s" : ""} selected
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
