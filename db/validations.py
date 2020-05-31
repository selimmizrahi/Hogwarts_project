studentKeys = ['first_name', 'last_name', 'existing_skills', 'desired_skills', 'interested_in_courses',
               'creation_time', 'update_time']
skills = ['Animagi', 'Metamorphmagi', 'Parseltongue', 'Seers', 'Legilimency and Occlumency',
          'Apparition and Disapparition', 'Teleportation', 'Veela Charm', 'Magical Resistence']
courses = ['Transfiguration', 'Defence Against the Dark Arts', 'Charms', 'Potion', 'Astronomy',
           'History of Magic', 'Herbology', 'Arithmancy', 'Study of Ancient Runes', 'Divination',
           'Care of Magical Creatures', 'Muggle Studies', 'Alchemy', 'Flying', 'Apparition']


class validate:

    def __init__(self,house_list,list_skills):
        self.Userkeys = ["firstName", "lastName", "username", "house", "year","password","admin"]
        self.houseList = house_list
        self.magic_skills = list_skills


    @staticmethod
    def validate_student(student_dict):
        student_dict_keys = []
        for x in student_dict:
            student_dict_keys.append(x)
        if student_dict_keys == studentKeys:
            return True
        else:
            return False

    @staticmethod
    def validate_key(key):
        if key not in studentKeys:
            print(f'Invalid key: field \'{key}\' doesnt\' exist')
            return False
        else:
            return True

