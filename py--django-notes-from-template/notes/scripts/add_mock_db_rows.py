from notes.models import Note
from notes.data import NOTES


if __name__ == "__main__":
    for note in NOTES.values():
        newNote = Note() 