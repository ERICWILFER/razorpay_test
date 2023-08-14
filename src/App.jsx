import "./App.css";
import axios from "axios";

const razorPayKeyId = "rzp_test_8nN58e8ffLtkXT";
const accessToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjkyMDM5NDg3LCJuYmYiOjE2OTIwMzk0ODcsImV4cCI6MTY5MjA0MzA4NywiZGF0YSI6eyJ1c2VyaWQiOiIwIiwicmVmaWQiOiJTVFVEMzI5ODQ2IiwidXNlcnR5cGUiOiJzdXBlcl9hZG1pbiIsInVzZXJuYW1lIjoiU3R1ZGVudCBBZG1pbiIsIm1vYmlsZSI6IjU1NTU1NTU1NTUiLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJzY2hvb2xpZCI6IkFMUEg1MTI3ODAifX0.adCbyCkqgq6U7_vgFZjjDwvppO5zTF7YN0kAVFFsJ4s";
const courseid = 7;
const coursetype = "beginner";
const mobile = "5555555555"; // school login mobile
const cartid = "142142424242";
const username = "Student Admin";

export default function App() {
  return (
    <>
      {/* <CoursePayment /> */}
      <ProductPayment />
    </>
  );
}

// const CoursePayment = () => {
//   const handlePayment = async (data) => {
//     console.log("handlePayment data:", data);
//     try {
//       const response = await axios.post(
//         "http://localhost/multeartsapi/api/payment/verify-course-payment.php",
//         data,
//         {
//           headers: {
//             Authorization: accessToken,
//           },
//         }
//       );
//
//       console.log("response", response);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//
//   const initPayment = (data) => {
//     console.log("initPayment  data:", data);
//
//     const options = {
//       key: razorPayKeyId, // Enter the Key ID generated from the Dashboard
//       amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "Eric",
//       description: "Test Transaction",
//       // "image": "https://example.com/your_logo",
//       order_id: data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       handler: function (response) {
//         const data = {
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_signature: response.razorpay_signature,
//           keyid: razorPayKeyId,
//           courseid: courseid,
//         };
//         handlePayment(data);
//       },
//       prefill: {
//         name: "Eric",
//         contact: mobile,
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//         username: username,
//         mobile: mobile,
//         courseid: courseid,
//         coursetype: coursetype,
//         paymenttype: "course",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//
//     const rPI = new window.Razorpay(options);
//
//     rPI.open();
//   };
//
//   const createOrder = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost/multeartsapi/api/payment/create-course-payment.php",
//         data,
//         {
//           headers: {
//             Authorization: accessToken,
//           },
//         }
//       );
//
//       console.log("response", response);
//
//       initPayment(response?.data?.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//
//   const createPayment = () => {
//     const data = {
//       keyid: razorPayKeyId,
//       courseid,
//       coursetype,
//     };
//
//     createOrder(data);
//   };
//
//   return (
//     <div className="App">
//       <h1>Razorpay Test</h1>
//       <button onClick={createPayment}>Pay</button>
//     </div>
//   );
// };

const ProductPayment = () => {
  const handlePayment = async (data) => {
    console.log("handlePayment data:", data);
    try {
      const response = await axios.post(
        "http://localhost/multeartsapi/api/payment/verify-products-payment.php",
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const initPayment = (data) => {
    console.log("initPayment  data:", data);

    const options = {
      key: razorPayKeyId, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Eric",
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          keyid: razorPayKeyId,
          courseid: courseid,
        };
        handlePayment(data);
      },
      prefill: {
        name: "Eric",
        contact: mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
        username: username,
        mobile: mobile,
        courseid: courseid,
        coursetype: coursetype,
        paymenttype: "products",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rPI = new window.Razorpay(options);

    rPI.open();
  };

  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost/multeartsapi/api/payment/create-products-payment.php",
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      console.log("response", response);

      initPayment(response?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createPayment = () => {
    const data = {
      keyid: razorPayKeyId,
      mobile: mobile, // mobile is mandatory
      cartid: cartid,
    };

    createOrder(data);
  };

  return (
    <div className="App">
      <h1>Razorpay Test</h1>
      <button onClick={createPayment}>Pay</button>
    </div>
  );
};
