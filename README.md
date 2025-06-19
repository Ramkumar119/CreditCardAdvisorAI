# 💳 Credit Card Advisor – Powered by LLMs | Times Internet Assignment 

A web-based **AI-powered credit card recommendation system** built using OpenAI's LLMs and agent frameworks. This project provides users with personalized credit card suggestions based on their preferences and financial habits, through an interactive conversational interface.

---

## 📌 Features

- 🔮 **Conversational Agent (LLM-powered)** – Dynamically asks relevant financial and lifestyle questions
- 🧠 **Smart Recommendations** – Suggests 3–5 best-fit credit cards based on user profile
- 📊 **Reward Simulation** – Estimates potential yearly savings
- 🗃️ **Card Database** – 20+ Indian credit cards with key details and perks
- 💬 **Chat/Guided Form Interface** – Simple and intuitive user journey
- 📱 **Mobile Responsive** – Fully functional across devices
---

## 🛠️ Tech Stack

| Layer        | Tech Used                         |
|--------------|-----------------------------------|
| Frontend     | React.js / Bootstrap / HTML & CSS |
| Backend      | Python (FastAPI / Flask)          |
| LLM Agent    | Together.AI API / LangChain |
| Database     | JSON / SQLite                     |
| Deployment   | Vercel (Frontend), Render (Backend) |
| Optional     | Twilio API (WhatsApp Integration) |

---
## 🧑‍💻 How It Works

1. The user interacts with an LLM-powered agent/chat interface.

2. The agent collects key data:
   - Monthly income
   - Spending categories (fuel, travel, etc.)
   - Preferred benefits (cashback, lounge, etc.)
   - Credit score (if known)
   - Existing cards
3. A **recommendation engine** matches this input with credit cards in the database.

4. The top cards are shown with:
   - Name, image, key perks
   - Personalized justification
   - Estimated yearly savings (simulation)

---

## 🗃️ Sample Card Database

Stored as `credit_cards.json` / SQL with fields:

- `name`, `issuer`, `joining_fee`, `reward_type`, `eligibility`, `benefits`, `image_url`, `apply_link`

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/credit-card-advisor.git
cd credit-card-advisor


## backend setup
cd ../backend
python -m venv venv
.\venv\Scripts\activate        # Windows
# source venv/bin/activate    # macOS/Linux
pip install -r requirements.txt


## frontend setup  ( frontend runn on http://localhost:3000 )

cd frontend
npm install
npm start


## env 
TOGETHER_API_KEY=your_together_api_key_here 

## run the server  (in terminal backend) (Backend will run on: http://localhost:8000 )
uvicorn main:app --reload


### 📂 Folder Structure

```bash

credit-card-advisor/
├── backend/                # FastAPI server
│   ├── main.py             # Core API logic
│   ├── recommender.py      # Prompt + card filtering
│   ├── cards.json          # Credit card data + images
│   └── requirements.txt
├── frontend/               # React UI
│   ├── public/
│   │   ├── images/         # All credit card images (JPG/PNG)
│   ├── src/
│   │   ├── App.js          # Main component
│   │   └── index.js
│   └── package.json
├── demo/                   # Demo GIFs or screenshots
│   └── demo.gif
├── .env.example            # Template for OpenAI/TogetherAI keys
└── README.md



📌 API Key Setup
We use Together.ai for LLM-based recommendations.

Create free account

Go to API Keys page

Generate your key and paste into .env

💡 Notes
cards.json contains all card data.

Card images must be inside frontend/public/images/

You can update card list or benefits manually.

🤝 Contributing
Pull requests are welcome. Feel free to submit issues or enhancements.

📄 License
MIT

🙋‍♂️ Author
Made with 💙 by Ram

---

