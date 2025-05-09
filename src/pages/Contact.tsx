// import toast from "react-hot-toast";
// import { FaRegClock } from "react-icons/fa6";
// import { FiMapPin, FiPhone } from "react-icons/fi";
// import { IoMailOutline } from "react-icons/io5";

// export default function Contact() {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // এখানে মেইল কয়ারা সিস্টেম করব পরে

//     // Reset the form
//     const form = e.target as HTMLFormElement;
//     form.reset();

//     // Show toast message
//     toast.success("Thanks! We will connect with you later.");
//   };

//   return (
//     <div className="bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
//           <p className="text-lg text-gray-600">
//             Have questions? We're here to help and would love to hear from you.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Contact Information */}
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
//             <div className="space-y-6">
//               <div className="flex items-start">
//                 <IoMailOutline className="h-6 w-6 text-orange-500 mt-1" />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium">Email</h3>
//                   <p className="text-gray-600">support@bikebazaar.com</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FiPhone className="h-6 w-6 text-orange-500 mt-1" />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium">Phone</h3>
//                   <p className="text-gray-600">+1 (555) 123-4567</p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FiMapPin className="h-6 w-6 text-orange-500 mt-1" />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium">Address</h3>
//                   <p className="text-gray-600">
//                     123 Bike Street
//                     <br />
//                     Cycling City, CC 12345
//                     <br />
//                     United States
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <FaRegClock className="h-6 w-6 text-orange-500 mt-1" />
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium">Business Hours</h3>
//                   <p className="text-gray-600">
//                     Monday - Friday: 9:00 AM - 6:00 PM
//                     <br />
//                     Saturday: 10:00 AM - 4:00 PM
//                     <br />
//                     Sunday: Closed
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div>
//             <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="subject"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={4}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* new code */

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegClock } from "react-icons/fa6";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = async (data: IFormInputs) => {
    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulating successful API response
      console.log("Form data:", data);

      // Reset form
      reset();

      // Show success message
      toast.success("Thanks! We will connect with you later.");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions? We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <IoMailOutline className="h-6 w-6 text-orange-500 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-600">support@bikebazaar.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <FiPhone className="h-6 w-6 text-orange-500 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <FiMapPin className="h-6 w-6 text-orange-500 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Bike Street
                    <br />
                    Cycling City, CC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaRegClock className="h-6 w-6 text-orange-500 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
