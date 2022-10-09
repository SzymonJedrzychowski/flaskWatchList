from flask import Flask, render_template, request, url_for, redirect, session
import json
import os
import pymongo
import bcrypt

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
client = pymongo.MongoClient(os.environ.get("DATABASECONN"))
db = client["myPersonalList"]


@app.route("/")
def index():
    if "name" in session:
        return render_template("index.html", name=session["name"], data=db["watchList"].find({"account_name": session["name"]}))
    else:
        return render_template("index.html", name="", data=db["watchList"].find({"account_name": "demo"}))


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
    if "name" in session:
        session.pop("name", None)

    return redirect("/")
