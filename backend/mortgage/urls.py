from django.urls import path
from .views import *

urlpatterns = [
    path("mortgages/",MortgageAPI.as_view(),name="mortgages"),
    path("mortgages/<int:id>/",MortgageAPI.as_view(),name="mortgages")
]