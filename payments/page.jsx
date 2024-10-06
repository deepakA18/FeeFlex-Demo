import "rc-slider/assets/index.css";
import React from 'react';
import SwapComponent from '@/components/SwapComponent';
import Navbar from '@/components/Navbar';
import { fetchAvailableTokens } from '@/service/jupiter-service';
import PaymentComponent from "@/components/PaymentComponent";

// const SendTokenComponent = ({ availableTokens }) => {
//   // State for From Tokens (Sender selects one token, with percentage defaulted to 100%)
//   const [fromTokens, setFromTokens] = useState([
//     { token: "", value: "", uri: "", percentage: 100 },
//   ]);

//   // State for Sender's Address
//   const [senderAddress, setSenderAddress] = useState("");

//   // Additional States
//   const [isLoading, setIsLoading] = useState(false);

//   // Debounced Fetch Price Function
//   const fetchPrice = useCallback(
//     debounce(async (fromToken, amount) => {
//       if (!fromToken || !amount) return;

//       setIsLoading(true);
//       try {
//         const price = await fetchOneToOnePrice(fromToken);
//         setFromTokens((prevTokens) =>
//           prevTokens.map((token) => ({
//             ...token,
//             value: price * amount * (token.percentage / 100),
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching conversion:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 500),
//     []
//   );

//   // Handler for Token Selection Change
//   const handleTokenChange = (index, value) => {
//     let logoURI = null;
//     const tokenEntry = availableTokens.find((token) => token.symbol === value);
//     if (tokenEntry) {
//       logoURI = tokenEntry.logoURI;
//     }

//     const newFromTokens = [...fromTokens];
//     newFromTokens[index].token = value;
//     newFromTokens[index].uri = logoURI ? logoURI : "";
//     setFromTokens(newFromTokens);
//   };

//   // Handler for Value Change (Amount to Send)
//   const handleValueChange = (index, value) => {
//     const newFromTokens = [...fromTokens];
//     newFromTokens[index].value = value;
//     setFromTokens(newFromTokens);

//     fetchPrice(fromTokens[index].token, value);
//   };

//   // Handler for Sender Address Change
//   const handleSenderAddressChange = (e) => {
//     setSenderAddress(e.target.value);
//   };

//   // Function to Render Token Inputs
//   const renderTokenInputs = (tokens) => {
//     return tokens.map((token, index) => (
//       <div key={index} className="space-y-4 mb-6 overflow-hidden">
//         {/* Token Selection and Value Input */}
//         <div className="flex flex-col space-y-2 overflow-hidden">
//           <div className="flex items-center space-x-4">
//             {/* Token Logo */}
//             <img
//               src={token.uri !== "" ? token.uri : "/image.png"}
//               alt="Token Logo"
//               className="w-6 h-6 rounded-full"
//             />
//             <div className="flex flex-col w-full ">
//               {/* Token Dropdown */}
//               <select
//                 value={token.token}
//                 onChange={(e) =>
//                   handleTokenChange(index, e.target.value, direction)
//                 }
//                 className="bg-gray-800 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option className="w-30" value="">
//                   Select Token
//                 </option>
//                 {availableTokens && availableTokens.length > 0 ? (
//                   availableTokens.map((t) => (
//                     <option key={t.symbol} value={t.symbol}>
//                       {t.name} ({t.symbol})
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled>No tokens available</option>
//                 )}
//               </select>
//             </div>
//           </div>
//           {/* Amount Input */}
//           <input
//             type="number"
//             value={token.value}
//             onChange={(e) => handleValueChange(index, e.target.value)}
//             className="bg-gray-800 rounded-md py-2 px-3 w-30 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Amount"
//           />
//         </div>
//       </div>
//     ));
//   };

//   // Handler for Send Token Action
//   const handleSendTokens = () => {
//     if (!senderAddress || !fromTokens[0]?.token || !fromTokens[0]?.value) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     // Trigger send token functionality here
//     console.log("Sending tokens", { fromTokens, senderAddress });
//   };

//   return (
//     <div className="bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
//       <h2 className="text-2xl font-bold mb-6">Send Tokens</h2>

//       <div className="space-y-8">
//         {/* From Section (Token and Amount) */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Select Token to Send
//           </label>
//           {renderTokenInputs(fromTokens)}
//         </div>

//         {/* Sender Address */}
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Sender's Address
//           </label>
//           <input
//             type="text"
//             value={senderAddress}
//             onChange={handleSenderAddressChange}
//             className="bg-gray-800 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter sender's address"
//           />
//         </div>

//         {/* Send Button */}
//         <button
//           onClick={handleSendTokens}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
//         >
//           Send Tokens
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendTokenComponent;


const PaymentPage = async () => {

  const availableTokens = await fetchAvailableTokens();

  return (
    <div className="bg-[#021524]"> 
      <Navbar />
      <div className="flex justify-center items-center min-h-screen" style={{ paddingTop: '0.5rem' }}>
        <div className="w-full max-w-lg">
          <PaymentComponent availableTokens={availableTokens} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

