from django.db import models

class Gameuser(models.Model):
    username = models.CharField(max_length= 12,unique=True)
    password = models.CharField(max_length= 16)
    email = models.EmailField(default="xxx@xx.com")
    age = models.IntegerField(default=18)
    nickname = models.CharField(max_length=6,default="sb")
    class Meta:
        verbose_name = "用户名"
        verbose_name_plural = verbose_name
        ordering = ['-id']
    def __str__(self):
        return self.username

class GameHistory(models.Model):
    username = models.OneToOneField(Gameuser)
    score = models.IntegerField("得分",default=0)
    class Meta:
        verbose_name = "游戏得分"
        verbose_name_plural = verbose_name
        ordering = ['score']
    def __str__(self):
        return self.score