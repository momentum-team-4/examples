from django.forms import Form, ModelForm, CharField, ChoiceField
from .models import Note


class NoteSearchForm(Form):
    SEARCH_BY_CHOICES = [
        ("contains", "contains"),
        ("exact match", "exact match"),
    ]
    ORDER_BY_CHOICES = [
        ("title", "title"),
        ("body", "body"),
    ]

    title = CharField()
    title_search_by = ChoiceField(choices=SEARCH_BY_CHOICES)
    title_order_by = ChoiceField(choices=ORDER_BY_CHOICES)
    body = CharField()
    body_search_by = ChoiceField(choices=SEARCH_BY_CHOICES)


class NoteForm(ModelForm):
    class Meta:
        model = Note
        fields = [
            'title',
            'body',
        ]