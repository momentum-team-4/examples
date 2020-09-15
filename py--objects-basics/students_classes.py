class Pet:
    def __init__(self, name, age, species):
        self.name = name
        self.age = age
        self.species = species


class Student:
    """
    Represents a Momentum Student.

    instance attributes:
        - name
        - team
        - pet

    methods:
        __init__
        __str__
        teammates - return True if the two Students are on the same team. Raise a TypeError if
        non-instance argument is not an instance fo Student.
    """
    def __init__(self, name, team, pet):
        self.name = name
        self.team = team
        self.pet = pet

    def __eq__(self, other):
        if isinstance(other, Student):
            return self.name == other.name and self.team == other.team and self.pet == other.pet

        return False

    def __str__(self):
        return f"{self.name}"

    def teammates(self, other):
        if isinstance(other, Student):
            return self.team == other.team

        raise TypeError(f"{other} is a {type(other)}, not a Student.")


class FrontEndStudent(Student):
    def __init__(self, name, team, pet, framework):
        super().__init__(name, team, pet)

        self.specialty = "frontend"
        self.framework = framework


class BackendStudent(Student):
    def __init__(self, name, team, pet, framework):
        super().__init__(name, team, pet)

        self.specialty = "backend"
        self.framework = framework

    def arbitrary_extension_method(self):
        print("Honestly you can add any method to a subclass.")


class CodingClass:
    def __init__(self, teacher, teamnumber, *students):
        self.teacher = teacher
        self.teamnumber = teamnumber
        self.__students = {s.name: s for s in students}

    def __getitem__(self, name):
        if name in self.__students:
            return self.__students[name]

        raise KeyError(f"No student {name} in this class.")

    def __iter__(self):
        return self.__students.values()
