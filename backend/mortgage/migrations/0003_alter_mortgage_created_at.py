# Generated by Django 5.1.3 on 2025-03-30 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mortgage', '0002_alter_mortgage_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mortgage',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
