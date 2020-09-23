from django.db import models
from django.core.validators import RegexValidator
from localflavor.us.models import USStateField, USZipCodeField
from users.models import User


class Contact(models.Model):
    phone_regex = RegexValidator(
        regex=r'^\+?\d{10}$',
        message="Phone number must be entered in the format: '+9999999999'.")

    name = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=11,
                                    validators=[phone_regex],
                                    null=True,
                                    blank=True)
    address_1 = models.CharField(max_length=255, null=True, blank=True)
    address_2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = USStateField(null=True, blank=True)
    zip_code = USZipCodeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey("Note", on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    def __repr__(self):
        return f"<Contact pk={self.pk} name={self.name}>"


class Note(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.body}"
