import { useState } from "react";
import axios from "axios";

export default function CreditCardAdvisor() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    spending: "",
    benefits: "",
    creditScore: "",
    existingCards: ""
  });
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");

  const allowedSpendings = ["fuel", "travel", "groceries", "dining"];
  const allowedBenefits = ["cashback", "travel points", "lounge access"];

  const questions = [
    { key: "income", label: "What is your monthly income?" },
    { key: "spending", label: "Where do you spend most (fuel, travel, groceries, dining)?" },
    { key: "benefits", label: "What benefits do you prefer (cashback, travel points, lounge access)?" },
    { key: "creditScore", label: "What is your credit score? (or type 'unknown')" },
    { key: "existingCards", label: "Any existing credit cards you have? (optional)" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [questions[step].key]: e.target.value });
    setError("");
  };

  const handleNext = () => {
    const key = questions[step].key;
    const value = formData[key].trim().toLowerCase();

    if (key === "income") {
      const income = parseFloat(value);
      if (isNaN(income) || income <= 1000) {
        setError("Please enter a valid income  or income greater than ₹1000.");
        return;
      }
    }

    if (key === "spending") {
      if (!allowedSpendings.includes(value)) {
        setError(`Spending must be one of: ${allowedSpendings.join(", ")}`);
        return;
      }
    }

    if (key === "benefits") {
      if (!allowedBenefits.includes(value)) {
        setError(`Benefit must be one of: ${allowedBenefits.join(", ")}`);
        return;
      }
    }

    if (key === "creditScore") {
      if (value !== "unknown") {
        const score = parseInt(value);
        if (isNaN(score) || score <= 0) {
          setError("Please enter a valid credit score above 0 or type 'unknown'.");
          return;
        }
      }
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      axios.post("http://localhost:8000/recommend", formData).then((res) => {
        setRecommendations(res.data);
      }).catch(() => {
        setError("Something went wrong. Please try again later.");
      });
    }
  };

  const handleRestart = () => {
    setStep(0);
    setFormData({
      income: "",
      spending: "",
      benefits: "",
      creditScore: "",
      existingCards: ""
    });
    setRecommendations(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        {!recommendations ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Credit Card Advisor</h2>
            <p className="text-gray-700 mb-4">{questions[step].label}</p>
            <input
              type="text"
              value={formData[questions[step].key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Type your answer here"
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {step === questions.length - 1 ? "Get Recommendations" : "Next"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Recommended Cards</h2>
            <div className="space-y-4">

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{recommendations.map((card, index) => (
  <div
    key={index}
    className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg max-w-2xl w-full mx-auto mb-8 text-center"
  >
    {/* Card Image */}
    <div className="flex justify-center mb-4">

     <img
  src={card.image_url}
  onError={(e) => { e.target.src = "/images/default.jpg"; }}
  alt={card.name}
  className="w-40 h-28 object-contain bg-gray-100 rounded-lg"
/>

    </div>

    {/* Card Name */}
    <h2 className="text-xl font-bold mb-2">{card.name}</h2>

    {/* Reasons */}
    <p className="text-sm mb-3">{card.reasons}</p>

    {/* Reward */}
    <p className="text-green-700 font-semibold mb-4">{card.rewardSimulation}</p>

    {/* Apply Button */}
    {card.apply_link && (
      <div className="flex justify-center">
        <a
          href={card.apply_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              backgroundColor: '#1D4ED8',
              color: 'white',
              width: '150px',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#fffff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#1D4ED8';
            }}
          >
            Apply
          </button>
        </a>
      </div>
    )}
  </div>
))}


            </div>
            </div>
            <br/>
            <button
              onClick={handleRestart}
              className="mt-6 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}