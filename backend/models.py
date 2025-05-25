from tortoise.models import Model
from tortoise.fields import IntField, CharField, DatetimeField
from datetime import datetime, timezone

class User(Model):
    id = IntField(pk=True)
    name = CharField(max_length=255)
    email = CharField(max_length=255, unique=True)
    password_hash = CharField(max_length=255)
    role = CharField(max_length=50, choices=(("buyer", "Buyer"), ("seller", "Seller")))
    created_at = DatetimeField(auto_now_add=True)
    
    class Meta:
        table = "users"
