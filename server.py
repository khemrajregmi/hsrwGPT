from flask import Flask, request, jsonify, Response
import setup
import chat
import json
from flask import Flask
from flask_cors import CORS

# Create the Flask app
app = Flask(__name__)
CORS(app)

docsearch, chain = setup.pre_setup()


# Define the function to be called
def process_input(input_data):
    print('inside input data')
    print(input_data)
    # Process the input data as needed
    return 'Processed: ' + input_data


# Define the API endpoint
@app.route('/process', methods=['POST'])
def handle_process():
    print('khem reach here')
    # return "test"
    # Get the input data from the request
    input_data = request.data.decode('utf-8')
    print("Received input:", input_data)
    result = chat.chat(docsearch, chain, input_data)
    print(result)

    # Convert the result to JSON
    json_result = json.dumps(result)
    print('khem reach here again', json_result)

    # Return the JSON response
    return Response(json_result, content_type='application/json')


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=6001)
