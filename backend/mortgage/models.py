from django.db import models

class Mortgage(models.Model):
    
    LOAN_TYPE = (
        ("fixed", "Fixed"),
        ("adjustable", "Adjustable")
    )

    PROPERTY_TYPE = (
        ("single_family", "Single Family"),
        ("condo", "Condo")
    )
    
    credit_score = models.IntegerField()
    loan_amount = models.FloatField()
    property_value = models.FloatField()
    annual_income = models.FloatField()
    debt_amount = models.FloatField()
    loan_type = models.CharField(max_length=20,choices=LOAN_TYPE)
    property_type = models.CharField(max_length=20,choices=PROPERTY_TYPE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
        db_table = 'mortgages' 