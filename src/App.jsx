import jwtDecode from "jwt-decode";
import "./App.css";
import axios from "axios";

const razorPayKeyId = "rzp_test_8nN58e8ffLtkXT";
const accessToken =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjkzNjMxOTAxLCJuYmYiOjE2OTM2MzE5MDEsImV4cCI6MTY5MzYzNTUwMSwiZGF0YSI6eyJ1c2VyaWQiOiIwIiwicmVmaWQiOiJTVFVEMzI5ODQ2IiwicmVmYnkiOiIiLCJ1c2VydHlwZSI6InN1cGVyX2FkbWluIiwidXNlcm5hbWUiOiJTdHVkZW50IEFkbWluIiwibW9iaWxlIjoiNTU1NTU1NTU1NSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsInNjaG9vbGlkIjoiQUxQSDUxMjc4MCJ9fQ.ehyiWAsaPiqgVHqUv-AeMAzQIW-cyHS524-BM7Jnuh8"

const mobile = jwtDecode(accessToken)?.data?.mobile;
const courseid = 6;
const coursetype = "beginner";
const cartid = "14214242424245";
const address = "456 Elm Avenue, Willowbrook, Meadowland, 54321";

export default function App() {
  return (
    <>
      <CoursePayment />
      <ProductPayment />
    </>
  );
}

const CoursePayment = () => {
  const handlePayment = async (data) => {
    console.log("handlePayment data:", data);
    try {
      const response = await axios.post(
        "http://localhost/multeartsapi/api/payment/verify-course-payment.php",
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
        };
        handlePayment(data);
      },
      prefill: {
        name: "Eric",
        contact: mobile,
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
        "http://localhost/multeartsapi/api/payment/create-course-payment.php",
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
      courseid,
      coursetype,
    };

    createOrder(data);
  };

  return (
    <div className="App">
      <h1>Razorpay Course Test</h1>
      <button onClick={createPayment}>Pay</button>
    </div>
  );
};

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
          address: address,
        };
        handlePayment(data);
      },
      prefill: {
        name: "Eric",
        contact: mobile,
      },
      notes: {
        address: address,
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
      cartid: cartid, // optional
    };

    createOrder(data);
  };

  return (
    <div className="App">
      <h1>Razorpay Product Test</h1>
      <button onClick={createPayment}>Pay</button>
    </div>
  );
};
