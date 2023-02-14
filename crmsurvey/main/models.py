from django.db import models
from django.db.models.fields import BooleanField, CharField, TextField, DateTimeField

# Create your models here.
class survey(models.Model):
    id = models.AutoField(primary_key=True)
    isResolved = models.CharField(max_length= 50,null = True)
    isSatisfied = models.CharField(max_length= 50,null = True)
    isHelpful = models.CharField(max_length= 50,null = True)
    Suggestion = models.TextField(null = True)
    isReopen = models.CharField(max_length= 50,null = True)
    Phonenumber = models.CharField(max_length= 50,null = True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    TicketNumber = models.CharField(max_length= 20,unique=True)
    ReopenResponse = models.TextField(null = True)
    StatusCode = models.IntegerField(null = True)

class BadLogs(models.Model):
    id = models.AutoField(primary_key=True)
    Payload = models.TextField(null = True)
    Error = models.TextField(null = True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    TicketNumber = models.CharField(max_length= 20)
    ReopenResponse = models.TextField(null = True)
    StatusCode = models.IntegerField(null = True)

