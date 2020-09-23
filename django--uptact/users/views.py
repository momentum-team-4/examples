from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.messages import success, error
from .forms import UserCreationForm
from .models import User

# Create your views here.
def create_user(request):
    if request.method == 'GET':
        form = UserCreationForm()

    else:
        form = UserCreationForm(data=request.POST)

        if form.is_valid():
            form.save()
            
            return redirect(to='list_contacts')

    return render(request, "users/create_user.html", {"form": form})


def login_user(request):
    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            success(request, "login successful!")
            login(request, user)
            redirect(to='list_contacts')

        else:
            error(request, "no matching username/password combination.")

    return render(request, "users/login_user.html")


def logout_user(request):
    logout(request)
    redirect(to='list_contacts')





















