from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *
from .credit_rating import *


class MortgageAPI(APIView):
    
    def get(self,request):
        try:
            mortgages = Mortgage.objects.all()
            serializer = MortgageSerializers(mortgages, many=True)
            if len(serializer.data) > 0:
                response = {"status_code":"200","message":"success","data":serializer.data}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
            else:
                response = {"status_code":"400","message":"No data found","data":""}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
        except Exception as e:
            print(e)
            response = {"status_code":"500","message":"something went wrong","data":""}
            return JsonResponse(response,status=status.HTTP_500_INTERNAL_SERVER_ERROR,safe=False)
    
    def post(self,request):
        try:
            serializer = MortgageSerializers(data=request.data, many=True)
            if serializer.is_valid():
                serializer.save()
                credit_rating  = calculate_credit_rating(serializer.data)
                response = {"status_code":"200","message":"success","data":{"credit_rating":credit_rating}}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
            else:
                response = {"status_code":"400","message":"Failed","data":serializer.errors}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
        except Exception as e:
            response = {"status_code":"500","message":"something went wrong","data":""}
            return JsonResponse(response,status=status.HTTP_500_INTERNAL_SERVER_ERROR,safe=False)
    
    def delete(self,request,id):
        try:
            mortgages = Mortgage.objects.get(id=id)
            if mortgages:
                mortgages.delete()
                response = {"status_code":"200","message":"Mortgage data deleted","data":""}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
            else:
                response = {"status_code":"400","message":"No data found","data":""}
                return JsonResponse(response,status=status.HTTP_200_OK,safe=False)
        except Exception as e:
            response = {"status_code":"500","message":"something went wrong","data":""}
            return JsonResponse(response,status=status.HTTP_500_INTERNAL_SERVER_ERROR,safe=False)