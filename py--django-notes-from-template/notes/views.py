from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.messages import success, error
from .models import Note
from .forms import NoteForm, NoteSearchForm


def notes_list(request):
    notes = Note.objects.all()
    return render(request, "notes/notes_list.html", {"notes": notes})


def notes_detail(request, pk):
    note = get_object_or_404(Note, pk=pk)
    
    return render(request, "notes/notes_detail.html", {"note": note})


def notes_create(request):
    if request.method == "GET":
        form = NoteForm()

    else:
        form = NoteForm(data=request.POST)

        if form.is_valid():
            form.save()

            success(request, "note created.")
            return redirect(to='notes_list')

    return render(request, "notes/notes_create.html", {"form": form})


def notes_update(request, pk):
    note = get_object_or_404(Note, pk=pk)

    if request.method == "GET":
        form = NoteForm(instance=note)

    else:
        form = NoteForm(data=request.POST, instance=note)

        if form.is_valid():
            form.save()
            success(request, "note updated.")

            return redirect(to='notes_list')

    return render(request, "notes/notes_update.html", {"form": form})


def notes_delete(request, pk):
    if request.method == "GET":
        return render(request, "notes/notes_delete.html")

    else:
        note = get_object_or_404(Note, pk=pk)
        note.delete()
        success(request, "note deleted.")

        return redirect(to="notes_list")


def notes_search(request):
    if request.method == "GET":
        form = NoteSearchForm()
        return render(request, "notes/notes_search.html", {'form': form})

    else:
        title_text = request.POST['title']
        title_search_criteria = request.POST['title_search_by']
        body_text = request.POST['body']
        body_search_criteria = request.POST['body_search_by']

        results = Note.objects.all()

        if title_search_criteria == 'contains':
            results = results.filter(title__contains=title_text)

        else:
            results = results.filter(title=title_text)

        if body_search_criteria == 'contains':
            results = results.filter(body__contains=body_text)

        else:
            results = results.filter(body=body_text)

        return render(request, "notes/notes_search_results.html", {"results": results})
