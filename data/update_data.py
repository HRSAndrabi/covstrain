import requests
from requests.auth import HTTPBasicAuth
import json


url = 'https://www.epicov.org/epi3/feed/gisaid_variants_statistics.json'
target_path = './gisaid_variants_statistics2.json'

response = requests.get(url, stream=True, auth=HTTPBasicAuth('USER_NAME', 'PASSWORD'))
print(response.json())
if response.status_code == 200:
    with open(target_path, 'w') as f:
        json.dump(response.json(), f)

print("done")






