import datetime

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['Hogwarts']
collection = db['students']


magic_skills = ['Animagi', 'Metamorphmagi',
                'Parseltongue', 'Seers',
                'Legilimency and Occlumency',
                'Apparition and Disapparition',
                'Teleportation', 'Veela Charm',
                'Magical Resistence']

all_courses = ['Transfiguration',
               'Defence Against the Dark Arts',
               'Charms', 'Potion', 'Astronomy',
               'History of Magic', 'Herbology',
               'Arithmancy', 'Study of Ancient Runes',
               'Divination', 'Care of Magical Creatures',
               'Muggle Studies', 'Alchemy', 'Flying',
               'Apparition']

student = {"first_name": "Jenna",
           "last_name": "Kayla",
           "creation_time": datetime.datetime.now(),
           "update_time": datetime.datetime.now(),
           "existing_skills": {magic_skills[2]: 3},
           "desired_skills": {magic_skills[4]: 5},
           "interested_in_courses": [all_courses[3]]
           }


student_id = collection.insert_one(student)