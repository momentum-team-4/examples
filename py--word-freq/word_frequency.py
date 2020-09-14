STOP_WORDS = {'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
              'i', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'were',
              'will', 'with'}

def get_words_list(fname):
    with open(fname, "rt") as infile:
        blob = infile.read() 
    
    # Filter file contents for punctuation, case, and whether in STOP_WORDS 

    filtered_blob = ''.join(filter(lambda s: s.isalnum() or s.isspace(), blob.lower()))
    separated = filtered_blob.split()
    without_stop_words = [w for w in separated if w not in STOP_WORDS]

    return without_stop_words

def get_counts(wordslist):
    return {w: wordslist.count(w) for w in set(wordslist)}


if __name__ == "__main__":
    words_list = get_words_list('one-today.txt')
    counts = get_counts(words_list)
    
    for w in sorted(counts, key=counts.get, reverse=True):
        print(f'{w} appears {counts[w]} times.')