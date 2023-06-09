from flask import Flask, request, jsonify
import setup
import chat

# Create the Flask app
app = Flask(__name__)

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
    # return "test"
    # Get the input data from the request
    input_data = request.data.decode('utf-8')

    print("Received input:", input_data)
    result = chat.chat(docsearch, chain, input_data)
    print(result)

    # Return the result as the response
    return result


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=6000)
