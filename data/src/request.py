import os
import json
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime

def request_data():
	print("Requesting data ...")
	url = "https://www.epicov.org/epi3/feed/gisaid_variants_statistics.json"
	base_path = './data/gisaid'

	response = requests.get(
		url, stream=True, 
		auth=HTTPBasicAuth(
			os.environ["GISAID_USER"], 
			os.environ["GISAID_PASS"]
		)
	)
	
	try:
		response.json()
	except:
		raise ValueError("Failed to download data. Check GISAID credentials.")

	if response.status_code == 200:
		print("Request OK.")
		with open(f"{base_path}/raw.json", "w") as f:
			print("Writing data ...")	
			json.dump(response.json(), f)
			print(f"Data written to: {base_path}/raw.json")
		with open(f"{base_path}/timeStamp.json", "w") as f:
			json.dump({"timeStamp": datetime.today().strftime('%d %b %Y')}, f)