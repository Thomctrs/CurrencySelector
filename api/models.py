from django.db import models

# Create your models here.
class Devise(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.FloatField()
    date = models.DateField()


    def __str__(self):
        return self.nom
