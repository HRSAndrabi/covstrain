import os

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
