import requests
from requests.auth import HTTPBasicAuth
import json
import pandas as pd
import numpy as np
import os
import warnings
from datetime import timedelta, datetime

# Ignore:
# FutureWarning: The default dtype for empty Series will be 'object' instead of 'float64' 
# in a future version. Specify a dtype explicitly to silence this warning.
warnings.simplefilter(action="ignore", category=FutureWarning)

def request_data():
	print("Requesting data ...")
	url = "https://www.epicov.org/epi3/feed/gisaid_variants_statistics.json"
	base_path = './data/gisaid'

	response = requests.get(url, stream=True, auth=HTTPBasicAuth("USERNAME", "PASSWORD"))
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

def make_path(path):
	'''
	Generates directories for a specified path if it does not already exist.
	'''
	if '/' not in path:
		return
	out_folder = os.path.dirname(path)
	if not os.path.exists(out_folder):
		make_path(out_folder)
		os.mkdir(out_folder)

def disaggregate(x):
	try:
		return {element["value"]: element["count"] for element in x}
	except: 
		return np.NaN

def load_data(update=False):
	if update:
		request_data()

	try:
		print("Loading data ...")
		gisaid_data = json.load(open("./data/gisaid/raw.json"))["stats"]
	except:
		print("Raw dataset not found at: data/raw.json")
		request_data()
		print("Loading data ...")
		gisaid_data = json.load(open("./data/gisaid/raw.json"))["stats"]

	country_data = json.load(open("./data/countries.json"))

	gisaid_df = pd.DataFrame(gisaid_data)
	columns = gisaid_df.columns
	gisaid_df.reset_index(inplace=True)
	gisaid_df = pd.melt(gisaid_df, id_vars=["index"], value_vars=columns)
	gisaid_df.rename({
		"index": "country",
		"variable": "date",
	}, inplace=True, axis=1)

	gisaid_df = pd.concat(
		[gisaid_df.drop(["value"], axis=1), 
		gisaid_df["value"].apply(pd.Series)], axis=1
		)
	gisaid_df["date"] = pd.to_datetime(gisaid_df["date"])
	variant_df = gisaid_df[["date", "country", "submissions_per_variant", "submissions"]].copy()
	aa_substitution_df = gisaid_df[["date", "country", "submissions_per_aa_substitution", "submissions"]].copy()
	lineage_df = gisaid_df[["date", "country", "submissions_per_lineage", "submissions"]].copy()
	clade_df = gisaid_df[["date", "country", "submissions_per_clade", "submissions"]].copy()

	for df in [variant_df, aa_substitution_df, lineage_df, clade_df]:
		df.rename({
			"submissions_per_variant": "variable",
			"submissions_per_aa_substitution": "variable",
			"submissions_per_lineage": "variable",
			"submissions_per_clade": "variable",
		}, inplace=True, axis=1)

	return {
		"submissions_per_variant": variant_df, 
		"submissions_per_aa_substitution": aa_substitution_df, 
		"submissions_per_lineage": lineage_df, 
		"submissions_per_clade": clade_df
		}

def calculate_proportions(input):
	output = input
	for i in range(0, len(input)):
		for key, value in input[i].items():
			if key == "date" or key == "submissions" or key == "date_range" or key == "country":
				continue
			elif input[i]["submissions"] == 0:
				output[i][key] = value
				continue
			else: 
				output[i][key] = value / output[i]["submissions"]
			
	return output

def clean_data(update=False):
	data = load_data(update=update)
	country_data = json.load(open("./data/countries.json"))

	for file_name, df in data.items():
		print(f"Processing '{file_name}' files ...")

		df["variable"] = df["variable"].apply(disaggregate)
		df = pd.concat(
			[df.drop(["variable"], axis=1), 
			df["variable"].apply(pd.Series)], axis=1
			)
		df.drop([0], axis=1, inplace=True)
		df.fillna(0, inplace=True)

		for country in country_data:
			country_query = country["name"]["common"]
			if  country_query == "United States":
				country_query = "USA"
			temp_df = df.copy()
			temp_df = temp_df.loc[
				(temp_df["country"] == country_query)
			]
			aggregation = {
				column: "sum" for column in temp_df.columns
			}
			aggregation["date"] = "first"
			aggregation["country"] = "first"
			temp_df.index = temp_df["date"]
			temp_df = temp_df.groupby(pd.Grouper(freq="W")).agg(aggregation)
			temp_df["date_range"] = temp_df.index.strftime("%-d %b") + "-" + (temp_df.index + timedelta(days=7)).strftime("%-d %b %Y")
			temp_df["date"] = temp_df.index.strftime("%-d %b %Y") 
			temp_df = temp_df.loc[(temp_df["submissions"] > 0)]
			output = calculate_proportions(temp_df.to_dict("records"))
			output_path = f"./data/gisaid/{country['cca3'].lower()}/{file_name}.json"
			make_path(output_path)
			try:
				with open(output_path, 'w') as f:
					json.dump(output, f, indent=4, sort_keys=True)
			except:
				with open(output_path, 'w') as f:
					json.dump({}, f)


        

clean_data(update=False)
