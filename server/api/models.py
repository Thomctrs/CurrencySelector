from django.db import models

# Create your models here.
class Devise(models.Model):
    pair = models.CharField(max_length=100)
    ratio = models.FloatField()
    date = models.DateField()


    def __str__(self):
        return self.pair
