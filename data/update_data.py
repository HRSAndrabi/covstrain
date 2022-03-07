import requests
from requests.auth import HTTPBasicAuth
import json
import pandas as pd
from datetime import timedelta

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

def generate_variant_snapshot(country, variant_data, date):
    country_date_obj = variant_data[country["name"]["common"]] 
    variant_snapshot = {
        variant["value"]: variant["count"]
        for variant in country_date_obj["submissions_per_variant"]
    }
    variant_snapshot["submissions"] = country_date_obj["submissions"]
    df = pd.DataFrame({date: variant_snapshot}).transpose()
    df.index = pd.to_datetime(df.index)
    return df


def make_country_output(country):
    gisaid_data = json.load(open("./data/gisaid/raw.json"))["stats"]
    output = {} 

    variant_df = pd.DataFrame()
    aa_substitution_df = pd.DataFrame()

    output_path = f"data/gisaid/{country['cca3'].lower()}.json"
    for date, variant_data in gisaid_data.items():
        if country["name"]["common"] in variant_data:
            variant_snapshot_df = generate_variant_snapshot(
                country=country,
                variant_data=variant_data,
                date=date,
            )
            variant_df = variant_df.append(variant_snapshot_df) 
        else:
            pass
    try:
        variant_df = variant_df.groupby(pd.Grouper(freq='2W')).sum()
        variant_df = variant_df.divide(variant_df["submissions"], axis=0)
        variant_df.fillna(0, inplace=True)
        variant_df["name"] = variant_df.index.strftime('%m/%d/%Y')
        variant_series = [value for key, value in variant_df.transpose().to_dict().items()]
        output["variant_series"] = variant_series
    except:
        output["variant_series"] = []

    with open(output_path, 'w') as f:
        json.dump(output, f, indent=4, sort_keys=True)

def clean_data():
    country_data = json.load(open("./data/countries.json"))
    for country in country_data:
        print(country["name"]["common"])
        make_country_output(country=country)
        

clean_data()






