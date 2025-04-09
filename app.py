from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyDAxDDbP5L8df2MqbOOxz3wY70Edzq6bdE"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

app = Flask(__name__)
CORS(app)

# Use Gemini model to generate a response
def generate_response(message):
    response = chat.send_message(message)
    return response.text

@app.route('/chat', methods=['POST'])
def chat_route():
    data = request.json
    user_message = data.get('message', '')
    bot_response = generate_response(user_message)
    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)

