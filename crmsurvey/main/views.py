from django.shortcuts import render,redirect
# from django.views.generic.edit import FormView,FormMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from .models import survey,BadLogs
import requests
import threading
import concurrent.futures
import os
# Create your views here.

def home(request,ticketnumber):
    """ Logic to different ticketnumber format from mail & sms """
    if len(ticketnumber.split("-")) != 3:
        ticketnumber = ticketnumber[0:3] + "-" + ticketnumber[3:10] + "-" +ticketnumber[10:16] 
    request.session['xhf'] = ticketnumber
    return render(request, 'main/index.html')


def reopencase(ticketnumber,model,id,data):
    if 'isReopen' in data.keys():
        if data['isReopen'] == 'Yes':
            resp = requests.post(url=os.getenv('REOPEN_URL'), 
            data = { "ticketnumber":ticketnumber, "action":"reactivate" }
            )
            record = model.objects.get(id=id)
            record.ReopenResponse = resp.json()
            record.StatusCode = resp.status_code
            record.save(update_fields=['StatusCode','ReopenResponse'])
            # print(resp.status_code)

    return None


class SurveyResponse(APIView):
    def post(self, request, format=None):
        data = request.data
        TicketNumber = self.request.session['xhf']
        data['TicketNumber'] = TicketNumber
        print(data)
        del data['csrfmiddlewaretoken'],data['undefined']
        try:
            mm = survey(**data)
            mm.save()
            # with concurrent.futures.ThreadPoolExecutor() as executor:
            reopencase(TicketNumber,survey,mm.id,data)
        except Exception as e:
            # print(e)
            badlog = {}
            badlog['Payload'] = data
            badlog['Error'] = e
            badlog['TicketNumber'] = TicketNumber
            print(badlog)
            mm = BadLogs(**badlog)
            mm.save()
            # with concurrent.futures.ThreadPoolExecutor() as executor:
            #     reopencase(TicketNumber,BadLogs,mm.id,data)

        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
