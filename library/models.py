from django.db import models
class adtab(models.Model):
    aname= models.CharField(max_length=30,primary_key=True)
    apword=models.CharField(max_length=30)
class user(models.Model):
    uemail=models.CharField(max_length=30,primary_key=True)
    uname=models.CharField(max_length=40)
    uage=models.IntegerField()
    umobile=models.IntegerField(unique=True)
    upword=models.CharField(max_length=40)
class books(models.Model):
    bid=models.CharField(primary_key=True,max_length=30)
    bname=models.CharField(max_length=30,unique=True)
    bcat=models.CharField(max_length=30)
    bauthor=models.CharField(max_length=30)
    bcopy=models.CharField(max_length=30)
    bimage=models.CharField(max_length=40)
class bcat(models.Model):
    bcid=models.IntegerField(primary_key=True)
    bcats=models.CharField(max_length=30,unique=True)
    bcatdec=models.CharField(max_length=100);
class btrans(models.Model):
    tid=models.IntegerField(primary_key=True)
    bid=models.CharField(max_length=40)
    uid=models.CharField(max_length=40)
    uname=models.CharField(max_length=40)
    bname=models.CharField(max_length=40)
    status=models.CharField(max_length=20)
    tdate=models.CharField(max_length=40)



# Create your models here.
