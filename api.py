from flask import Flask, request, jsonify, json
from flask_pymongo import pymongo
from db.dataLayer import DataLayer
import json
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)


app.config["MONGO_URI"] = "mongodb://localhost:27017/Hogwarts"
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'secret'

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

dataLayer = DataLayer()

try:
    client = pymongo.MongoClient(host='localhost', port=27017, serverSelectionTimeoutMS=1000)
    client.server_info()

except:
    print("ERROR - cannot connect to db")


@app.route("/students")
def get_all_students():
    students = dataLayer.get_all_students()
    studentList = []

    for x in students:
        studentList.append(x)

    response = app.response_class(response=(json.dumps({"data": studentList}, default=str)),
                                  status=200,
                                  mimetype="application/json")
    return response


# @app.route("/student/register", methods=["GET", "POST"])
# def student_register():
#     form = request.json
#     if (request.method == "POST"):
#         result =dataLayer.registerUser(form)
#         if result["status"]==200 :
#             print(form)
#             session["username"]={"data":form}
#         response=app.response_class(response=json.dumps(result),
#                                     status=result["status"],
#                                     mimetype="application/json")
#         return response

@app.route("/find_student")
def get_students_by_key():
    key = request.args.get("key")
    key_value = request.args.get("value")
    value = dataLayer.get_students_by_key(key, key_value)
    response = app.response_class(response=(json.dumps({"student": value}, default=str)),
                              status=200,
                              mimetype="application/json")
    return response


@app.route("/student/<id>")
def get_student_by_id(id):
    student = dataLayer.get_student_by_id(id)

    response = app.response_class(response=(json.dumps({"data": student}, default=str)),
                                  status=200,
                                  mimetype="application/json")
    return response


@app.route("/delete/student/<id>", methods=["DELETE"])
def delete_student(id):
    student = dataLayer.delete_student(id)
    print(student)

    response = app.response_class(response=json.dumps({"status": "ok"}))

    return response


@app.route("/student/update", methods=["POST"])
def update_student():
    key = request.args.get("key")
    key_value = request.args.get("value")
    new_key = request.args.get("new_key")
    new_value = request.args.get("new_value")
    value = dataLayer.update_student(key, key_value, new_key, new_value)
    if value.matched_count > 0:
        updated_student = dataLayer.get_students_by_key(new_key, new_value)
    else:
        print("Not working")

    response = app.response_class(
        response=json.dumps({'updated student:' + updated_student}, default=str),
        status=200,
        mimetype="application/json")
    return response


@app.route("/student/register", methods=["GET", "POST"])
def register():
    students = mongo.db.students
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    creation_time = datetime.utcnow()
    existing_skills = request.get_json()['existing_skills']

    student_id = students.insert({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': password,
        'creation_time': creation_time,
        'existing_skills': existing_skills,
    })

    new_student = students.find_one({'_id': student_id})

    result = {'email': new_student['email']+ 'registered'}

    return jsonify({'result': result})


@app.route('/student/login', methods={"POST", "GET"})
def login():
    students = mongo.db.students
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    response = students.find_one({'email': email})
    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity={
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({'token': access_token})
        else:
            result = jsonify({'error': "Invalid Username and Password"})
    else:
        result = jsonify({"result": "No Results found"})
    return result


if __name__ == "__main__":
    app.run(debug=True)
