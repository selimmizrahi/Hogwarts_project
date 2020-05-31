import pymongo
from models.student import Student
from bson import ObjectId
from db.validations import validate


class DataLayer:

    def get_all_students(self):
        students = self.__db.students.find()
        return students


    def get_students_by_key(self, key, key_value):
        user = self.__db.students.find_one({key: key_value})
        return user

    def get_student_by_id(self, id):
        student = self.__db.students.find_one({'_id': ObjectId(id)})
        return student

    def update_student(self, key, key_value, new_key, new_value):
        my_query = {key: key_value}
        new_value = {new_key: new_value}
        user_dict = self.__db.students.update_one(my_query, {"$set": new_value})
        return user_dict

    def create_student_from_dict(self, student_dict):
        student = Student(student_dict['_id'], student_dict['first_name'], student_dict['last_name'],
                          student_dict['creation_time'],
                          student_dict['update_time'], student_dict['existing_skills'], student_dict['desired_skills'],
                          student_dict['interested_in_courses'])

        return student

    def delete_student(self, id):
        user = self.__db.students.delete_one({'_id': ObjectId(id)})
        print(user)
        return user

    def __init__(self):
        self.__client = pymongo.MongoClient('localhost', 27017)
        self.__db = self.__client["Hogwarts"]

    def add_new_student(self, student):
        user_dict = self.__db.students.insert_one(student)
        return user_dict
