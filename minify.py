import requests
import re
import sys

try:
    filename = sys.argv[1]
except IndexError:
    raise ValueError("Include filename.")
if not re.match(".+\.js", filename):
    raise ValueError("Must be javascript file.")
url = 'https://javascript-minifier.com/raw'
data = {'input': open(filename, 'rb').read()}
response = requests.post(url, data=data)

with open(filename[:-3] + "-min.js", "w") as output:
    output.write(response.text)
