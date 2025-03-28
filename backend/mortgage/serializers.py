from rest_framework import serializers
from .models import *


class MortgageSerializers(serializers.ModelSerializer):
    class Meta:
        model = Mortgage
        fields = "__all__"