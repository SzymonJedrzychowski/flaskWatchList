from flask import Flask, render_template
import json
import os
app = Flask(__name__)

@app.route('/')
def generateIndexPage():
    data = loadData()
    return render_template("index.html", data=data)

def loadData():
    with open("api/static/data/data.json") as f:
        return json.load(f)