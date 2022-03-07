import requests
from requests.auth import HTTPBasicAuth
import json

def request_data():
    print("Requesting data ...")
    url = 'https://www.epicov.org/epi3/feed/gisaid_variants_statistics.json'
    target_path = './data/gisaid/raw.json'

    response = requests.get(url, stream=True, auth=HTTPBasicAuth('USERNAME', 'PASSWORD'))
    if response.status_code == 200:
        print("Request OK.")
        with open(target_path, 'w') as f:
            print("Writing data ...")
            json.dump(response.json(), f)
            print(f"Data written to: {target_path}")

def make_country_output(country):
    gisaid_data = json.load(open("./data/gisaid/raw.json"))
    output = gisaid_data["stats"]
    output_path = f"data/gisaid/{country['cca3'].lower()}.json"
    for date, variant_data in output.items():
        if country["name"]["common"] in variant_data:
            output[date] = variant_data[country["name"]["common"]]
        else:
            output[date] = {}

    with open(output_path, 'w') as f:
        json.dump(output, f, indent=4)

def clean_data():
    country_data = json.load(open("./data/countries.json"))
    for country in country_data:
        print(country["name"]["common"])
        make_country_output(country=country)
        

clean_data()






