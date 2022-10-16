from flask import Flask, render_template, request, url_for, redirect, session
import json
import os
import pymongo
import bcrypt
from bson.objectid import ObjectId
from pymongo.collation import Collation

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
client = pymongo.MongoClient(os.environ.get("DATABASECONN"))
db = client["myPersonalList"]

global hiddenId
hiddenId = ""

@app.route("/")
def index():
    global hiddenId
    a = hiddenId
    hiddenId = ""
    if "name" in session:
        data = db["watchList"].find({"account_name": session["name"]}).sort(
            [("status", -1), ("rating", -1)]).collation(Collation(locale='en_US', numericOrdering=True))
        return render_template("index.html", name=session["name"], data=data, hiddenId=a)
    else:
        hiddenId = ""
        data = db["watchList"].find({"account_name": "demo"}).sort(
            [("status", -1), ("rating", -1)]).collation(Collation(locale='en_US', numericOrdering=True))
        return render_template("index.html", name="", data=data, hiddenId=a)


@app.route("/createAccount", methods=['post', 'get'])
def createAccount():
    if request.method == "POST":
        accounts = db["accounts"]
        username = request.form.get("username")
        password = request.form.get("password")
        passwordRepeated = request.form.get("passwordRepeated")

        if username == "":
            message = 'Choose a username.'
            return render_template('createAccount.html', message=message)

        if password == "":
            message = 'Choose a password.'
            return render_template('createAccount.html', message=message)

        if accounts.find_one({"name": username}):
            message = 'This username is already in use.'
            return render_template('createAccount.html', message=message)

        if password != passwordRepeated:
            message = 'Passwords should match!'
            return render_template('createAccount.html', message=message)
        else:
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            newUser = {'name': username, 'password': hashed}
            accounts.insert_one(newUser)
            session["name"] = username
            return redirect('/')

    return render_template('createAccount.html')


@app.route("/login", methods=['post', 'get'])
def login():
    if request.method == "POST":
        accounts = db["accounts"]
        username = request.form.get("username")
        password = request.form.get("password")

        foundUser = accounts.find_one({"name": username})

        if not foundUser:
            message = 'There is no user with that name'
            return render_template('login.html', message=message)
        else:
            if not bcrypt.checkpw(password.encode('utf-8'), foundUser["password"]):
                message = 'Incorrect password'
                return render_template('login.html', message=message)

            session["name"] = foundUser["name"]
            return redirect('/')

    return render_template('login.html')


@app.route("/logout", methods=["POST", "GET"])
def logout():
    global hiddenId
    hiddenId = ""
    if "name" in session:
        session.pop("name", None)

    return redirect("/")


@app.route("/modify", methods=["POST", "GET"])
def modify():
    global hiddenId
    hiddenId = ""
    if request.method == "POST":
        action = request.form.get("act")
        hid = request.form.get("hid")
        if action == "remove":
            if hid == "" or not session.get('name'):
                return redirect("/")
            db["watchList"].delete_one({"_id": ObjectId(hid)})
            return redirect("/")
        elif action == "save":
            if session.get('name'):
                name = session["name"]
            else:
                return redirect("/")
            if hid == "":
                toAdd = {
                    "title": request.form.get("title"),
                    "status": request.form.get("status"),
                    "rating": request.form.get("rating"),
                    "description": request.form.get("description"),
                    "trailer": request.form.get("trailer"),
                    "wiki": request.form.get("wikiLink"),
                    "account_name": name
                }
                db["watchList"].insert_one(toAdd)
                return redirect("/")
            hiddenId = hid
            toMod = {"$set": {
                "title": request.form.get("title"),
                "status": request.form.get("status"),
                "rating": request.form.get("rating"),
                "description": request.form.get("description"),
                "trailer": request.form.get("trailer"),
                "wiki": request.form.get("wikiLink")
            }}
            db["watchList"].update_one({"_id": ObjectId(hid)}, toMod)
            return redirect("/")
