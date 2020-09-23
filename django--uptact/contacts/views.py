from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import Contact, Note
from .forms import ContactForm, NoteForm


# Create your views here.
@login_required
def list_contacts(request):
    contacts = Contact.objects.filter(user=request.user)

    return render(request, "contacts/list_contacts.html",
                  {"contacts": contacts})


def show_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk)

    return render(request, "contacts/show_contact.html",
    {"contact": contact})



@login_required
def add_contact(request):
    if request.method == 'GET':
        form = ContactForm()

    else:
        form = ContactForm(data=request.POST)
        
        if form.is_valid():
            contact = form.save(commit=False)
            contact.user = request.user
            contact.save()

            return redirect(to='list_contacts')

    return render(request, "contacts/add_contact.html", {"form": form})

@login_required
def edit_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk)

    if request.method == 'GET':
        form = ContactForm(instance=contact)

    else:
        form = ContactForm(data=request.POST, instance=contact)
        if form.is_valid():
            form.save()
            return redirect(to='list_contacts')

    return render(request, "contacts/edit_contact.html", {
        "form": form,
        "contact": contact
    })


@login_required
def delete_contact(request, pk):
    contact = get_object_or_404(Contact, pk=pk)

    if request.method == 'POST':
        contact.delete()
        return redirect(to='list_contacts')

    return render(request, "contacts/delete_contact.html",
                  {"contact": contact})


@login_required
def add_note(request, pk):
    contact = get_object_or_404(Contact, pk=pk)

    if request.method == 'GET':
        form = NoteForm()

    else:
        form = NoteForm(data=request.POST)

        if form.is_valid():
            note = form.save(commit=False)
            contact.note = note

            note.save()

            return redirect(to='list_contacts')

    return render(request, "contacts/notes/add_note.html",
    {"form": form})


@login_required
def edit_note(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    note = contact.note

    if request.method == 'GET':
        form = NoteForm(instance=note)

    else:
        form = NoteForm(data=request.POST, instance=note)

        if form.is_valid():
            note.save()

            return redirect(to='list_contacts')

    return render(request, "contacts/notes/edit_note.html",
    {"form": form})


@login_required
def delete_note(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    
    contact.note.delete()

    return redirect(to='list_contacts')
