from django.db import models
from users.models import User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    body = models.TextField(null=False, blank=False)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.title}"
