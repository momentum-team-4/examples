from django.contrib.auth.forms import UserCreationForms _UserCreationForm
from .models import User


class UserCreationForm(_UserCreationForm):
    class Meta(_UserCreationForm.Meta):
        model = User
        fields = _UserCreationForm.Meta.fields