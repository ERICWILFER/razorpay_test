import './App.css'
import axios from "axios";

const razorPayKeyId = "rzp_test_8nN58e8ffLtkXT";
const accessToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjkwOTk2NTI4LCJuYmYiOjE2OTA5OTY1MjgsImV4cCI6MTY5MTAwMDEyOCwiZGF0YSI6eyJ1c2VyaWQiOiJBQzVoTiIsInVzZXJ0eXBlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiU3R1ZGVudCA2NjYyNjQiLCJtb2JpbGUiOiI1NTU1NTU1NTU1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwic2Nob29saWQiOiIifX0.Yh73EF3amYNShpqjGCbqMckm3c31yP91r1cn6ZLWHpg"
const courseid = 6;
const coursetype = "demo";

export default function App() {

  const handlePayment = async (data) => {
    console.log("handlePayment data:", data);
    try {
      const response = await axios.post(
        "http://localhost/multeartsapi/api/payment/verify-course-payment.php",
        data,
        {
          headers: {
            Authorization: accessToken
          }
        }
      );

      console.log("response", response);

    }
    catch(error) {
      console.log("error", error);
    }
  }
  
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
        }
        handlePayment(data)
      },
      "prefill": {
          "name": "Eric",
          "contact": "5555555555",
      },
      "notes": {
          "address": "Razorpay Corporate Office", 
          "mobile": "5555555555",
          "courseid": courseid,
          "coursetype": coursetype,
      },
      "theme": {
          "color": "#3399cc",
      }
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
          Authorization: accessToken
          }
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
      coursetype
    };

    createOrder(data);
  };

  return (
    <div className="App">
      <h1>Razorpay Test</h1>
      <button onClick={createPayment}>Pay</button>
    </div>
  );
}
