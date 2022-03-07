import pandas as pd
from datetime import timedelta

dict1 = {
	"2020-1-1": {"key1": 1, "key2":2},
	"2020-1-2": {"key1": 1, "key2":2},
	}

dict2 = {
	"2020-1-3": {"key3": 1, "key4":2},
	"2020-1-4": {"key3": 1, "key4":2},
	"2020-1-10": {"key3": 1, "key4":2},
	}

df1 = pd.DataFrame(dict1).transpose()
df2 = pd.DataFrame(dict2).transpose()

df = df1.append(df2)
df.index = pd.to_datetime(df.index)
df = df.groupby(pd.Grouper(freq='W')).sum()
df["name"] = df.index.strftime('%m/%d/%Y')
df["end_date"] = df.index + timedelta(days=7)
df["date_range"] = str(df["end_date"])
# df = df.transpose().to_dict()
print(df)