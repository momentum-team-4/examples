from typing import Generator

def generatelines(fname: str) -> Generator:
    """
    Safe iterator over the lines of a file.
    """
    with open(fname) as genfile:
        for line in genfile:
            yield line.strip()


if __name__ == "__main__":
    assert list(generatelines("students-names.txt")) == ['Clint', 'Taylor', 'Kyle', 'Will', 'Jacqueline', 'Harrison', 'Jameel']
    print("success!")