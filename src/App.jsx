import './App.css'
import axios from "axios";

const razorPayKeyId = "rzp_test_8nN58e8ffLtkXT";
const accessToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjkwNzIxMzYxLCJuYmYiOjE2OTA3MjEzNjEsImV4cCI6MTY5MDcyNDk2MSwiZGF0YSI6eyJ1c2VyaWQiOiJBQzVoTiIsInVzZXJ0eXBlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiU3R1ZGVudCA2NjYyNjQiLCJtb2JpbGUiOiI1NTU1NTU1NTU1Iiwicm9sZSI6InN1cGVyX2FkbWluIiwic2Nob29saWQiOiIifX0.TkbqxwkgWR0d8RLeZhVsbzgfjh0t6mrHYtWoBagZhzM"

export default function App() {

  const handlePayment = async (data) => {
    console.log("handlePayment data:", data);
    try {
      const response = await axios.post(
        "http://localhost/multeartsapi/api/payment/verify-payment.php",
        data,
        {
          Headers: {
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
        }
        handlePayment(data)
      },
      "prefill": {
          "name": "Eric",
          "contact": "5555555555",
      },
      "notes": {
          "address": "Razorpay Corporate Office"
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
        "http://localhost/multeartsapi/api/payment/create-payment.php",
        data,
        {
          Authorization: accessToken
        }
      );

      console.log("response", response);

      initPayment(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createPayment = () => {
    const data = {
      keyid: razorPayKeyId,
      courseid: 4,
      coursetype: "demo"
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
