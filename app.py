from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Replace 'YOUR-API-KEY' with your OpenAI API key
openai.api_key = "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"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/respond", methods=["POST"])
def respond():
    user_input = request.json["message"]
    should_address_as_boss = request.json.get("boss", False)

    # Generate a response using OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Jarvis Assistant: {user_input}",
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )

    response_text = response.choices[0].text.strip()

    # Add "Boss" based on the shouldAddressAsBoss parameter
    if should_address_as_boss:
        response_text = f"Boss, {response_text}"

    return jsonify({"response_text": response_text})

if __name__ == "__main__":
    app.run()