# Generated by Django 3.0.6 on 2021-09-24 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BadLogs',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('Payload', models.TextField(null=True)),
                ('Error', models.TextField(null=True)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('TicketNumber', models.CharField(max_length=20)),
                ('ReopenResponse', models.TextField(null=True)),
                ('StatusCode', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='survey',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('isResolved', models.CharField(max_length=50, null=True)),
                ('isSatisfied', models.CharField(max_length=50, null=True)),
                ('isHelpful', models.CharField(max_length=50, null=True)),
                ('Suggestion', models.TextField(null=True)),
                ('isReopen', models.CharField(max_length=50, null=True)),
                ('Phonenumber', models.CharField(max_length=50, null=True)),
                ('CreatedAt', models.DateTimeField(auto_now_add=True)),
                ('TicketNumber', models.CharField(max_length=20, unique=True)),
                ('ReopenResponse', models.TextField(null=True)),
                ('StatusCode', models.IntegerField(null=True)),
            ],
        ),
    ]
