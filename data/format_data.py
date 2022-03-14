from src.format import format_data
import sys

# Run with python format.py
# Default is don't update data. To update data, run pythn format.py True

if len(sys.argv) > 1:
	update = bool(sys.argv[1])
else:
	update = False

format_data(update=update)