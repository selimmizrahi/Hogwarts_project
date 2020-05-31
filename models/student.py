import json


class Student:

    def to_json(self):
        return json.loads(json.dumps(self.__dict__))

    def __init__(self, student_id, first_name, last_name, creation_time, update_time,
                 existing_skills, desired_skills, interested_in_courses):

        self.student_id = str(student_id)
        self.first_name = first_name
        self.last_name = last_name
        self.creation_time = str(creation_time)
        self.update_time = str(update_time)
        self.existing_skills = existing_skills
        self.desired_skills = desired_skills
        self.interested_in_courses = interested_in_courses