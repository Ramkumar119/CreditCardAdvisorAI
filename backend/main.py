from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_community.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os
import json
import re

# Load API keys from .env
load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

# Load local JSON credit card database
with open("cards.json", "r", encoding="utf-8") as f:
    cards = json.load(f)

# Initialize FastAPI
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Together.ai using OpenAI-compatible interface
llm = ChatOpenAI(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    temperature=0.4,
    openai_api_base="https://api.together.xyz/v1",
    openai_api_key=TOGETHER_API_KEY
)

@app.post("/recommend")
async def recommend(request: Request):
    user_input = await request.json()

    # Build user profile for the LLM
    user_context = f"""
    Monthly income: ₹{user_input.get("income")}
    Spending category: {user_input.get("spending")}
    Preferred benefits: {user_input.get("benefits")}
    Credit score: {user_input.get("creditScore")}
    Existing cards: {user_input.get("existingCards") or "None"}
    """

    # Describe all available cards
    card_descriptions = ""
    for card in cards:
        card_descriptions += f"""
        - {card['name']} by {card['issuer']}
          Joining Fee: ₹{card['joining_fee']}
          Annual Fee: ₹{card['annual_fee']}
          Rewards: {card['reward_type']} | {card['reward_rate']}
          Benefits: {", ".join(card['benefits'])}
        """

    # Final prompt to send to AI
    full_prompt = f"""
    Based on the user profile below, recommend the 3 most suitable credit cards from the list.
    Return the result as a JSON array in this format:
    [
      {{
        "name": "Card Name",
        "image_url": "/images/card-file.png",
        "reasons": "Why this card is suitable",
        "rewardSimulation": "Expected yearly savings or benefits"
        "apply_link": "https://www.bank.com/card-apply-link"
      }}
    ]

    User Profile:
    {user_context}

    Available Cards:
    {card_descriptions}
    """

    try:
        response = llm.invoke([HumanMessage(content=full_prompt)])

        # Extract and parse JSON safely from AI response
        match = re.search(r"\[.*\]", response.content, re.DOTALL)
        if match:
            recommendations = json.loads(match.group())
            return recommendations
        else:
            raise ValueError("No JSON detected in response")

    except Exception as e:
        print("❌ AI error:", e)
        return [{
            "name": "Error",
            "image_url": "",
            "reasons": "AI failed to recommend cards. Try again later.",
            "rewardSimulation": ""
        }]
