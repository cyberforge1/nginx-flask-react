# scripts/manual_endpoint_test.py

import os
import json
import requests

# Define the base URL of the API
BASE_URL = "http://localhost:5001/api"

# Define the endpoints to test
ENDPOINTS = [
    {"name": "main", "url": f"{BASE_URL}/", "method": "GET"},
    {"name": "helloworld", "url": f"{BASE_URL}/helloworld/", "method": "GET"},
    {"name": "todos_list", "url": f"{BASE_URL}/todos/", "method": "GET"},
    {"name": "create_todo", "url": f"{BASE_URL}/todos/", "method": "POST", "data": {"title": "Sample Todo"}},
    {"name": "single_todo", "url": f"{BASE_URL}/todos/3/", "method": "GET"},
    {"name": "update_todo", "url": f"{BASE_URL}/todos/3/", "method": "PUT", "data": {"title": "Updated Todo"}},
    {"name": "delete_todo", "url": f"{BASE_URL}/todos/3/", "method": "DELETE"},
]

# Output file for results
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "endpoint_test_results.json")

# Function to make requests and collect responses
def test_endpoints():
    results = {}
    
    for endpoint in ENDPOINTS:
        name = endpoint["name"]
        url = endpoint["url"]
        method = endpoint["method"]
        data = endpoint.get("data", None)
        
        try:
            if method == "GET":
                response = requests.get(url)
            elif method == "POST":
                response = requests.post(url, json=data)
            elif method == "PUT":
                response = requests.put(url, json=data)
            elif method == "DELETE":
                response = requests.delete(url)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")

            results[name] = {
                "url": url,
                "method": method,
                "status_code": response.status_code,
                "response": response.json() if response.content else None,
            }
        except Exception as e:
            results[name] = {
                "url": url,
                "method": method,
                "error": str(e),
            }

    return results

if __name__ == "__main__":
    # Test endpoints and collect results
    test_results = test_endpoints()

    # Save results to a JSON file
    with open(OUTPUT_FILE, "w") as f:
        json.dump(test_results, f, indent=4)

    print(f"Endpoint test results saved to {OUTPUT_FILE}")
