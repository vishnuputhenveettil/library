from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import *
from django.core import serializers
from django.core.files.storage import FileSystemStorage
import json
import time
def fpage(request):
    return render(request,'index.html',{})
def admin_page(request):
    return render(request,'adminpage.html',{})
def admin_login(request):
    aname=request.GET.get("aname")
    apword=request.GET.get("apword")
    print(aname,apword)
    try:
        ob=adtab.objects.filter(aname=aname,apword=apword)
        c=ob.count()
        if(c==1):
            ob1=adtab.objects.get(aname=aname,apword=apword)
            request.session['aname']=ob1.aname
            return HttpResponse("success")
        else:
            return HttpResponse("incorrect user name or password")

    except Exception as e:
        print(e);
        return HttpResponse(e)
def user_reg(request):
    uname=request.GET.get("uname")
    uage=request.GET.get("uage")
    umobile=request.GET.get("umobile")
    umail=request.GET.get("umail")
    upword=request.GET.get("upword")
    try:
        obj=user.objects.filter(uemail=umail)
        co=obj.count()
        ob1=user.objects.filter(umobile=umobile)
        co1=ob1.count()
        if(co==0 and co1==0):
            ob=user(uemail=umail,uname=uname,uage=uage,umobile=umobile,upword=upword)
            ob.save()
            return HttpResponse("successfully registered")
        elif(co!=0):
            return HttpResponse("mail exist")
        else:
            return HttpResponse("mobile exist")
    except Exception as e:
        print(e)
        return HttpResponse(e)
def user_log(request):
    umail=request.GET.get("umail")
    upword=request.GET.get("upword")
    try:
        ob2=user.objects.filter(uemail=umail,upword=upword)
        co=ob2.count()
        if(co==1):
            ob3=user.objects.get(uemail=umail,upword=upword)
            request.session['user']=ob3.uemail
            return HttpResponse("success")
        else:
            return HttpResponse("incorrect mail id or password")
    except Exception as e:
        print(e)
        return HttpResponse("error occured")
def user_page(request):
    return render(request,'userpage.html',{})
def current(request):
    try:
        if request.session.has_key("user"):
            email=request.session["user"]
            ob=user.objects.get(uemail=email)
            name=ob.uname
            mail=ob.uemail
            print(mail)
            cu=[name,mail]
            return JsonResponse(cu,safe=False)
        else:
            return HttpResponse("nothing")
    except Exception as e:
        print(e)
        return HttpResponse("error")
def add_cat(request):
    print("hii")
    try:
        cid=request.GET.get("cid")
        cname=request.GET.get("cname")
        cdesc=request.GET.get("cdesc")
        ob=bcat(bcid=cid,bcats=cname,bcatdec=cdesc)
        ob.save()
        return HttpResponse("success")
    except Exception as e:
        print(e)
        return HttpResponse("something went wrong")
#adding books
def add_book(request):
    try:
        bid=request.GET.get("bid")
        bname=request.GET.get("bname")
        bcat=request.GET.get("bcat")
        bauth=request.GET.get("bauth")
        bnum=request.GET.get("bnum")
        ob=books(bid=bid,bname=bname,bcat=bcat,bauthor=bauth,bcopy=bnum)
        ob.save()
        return HttpResponse("success")
    except Exception as e:
        print(e)
        return HttpResponse("error")

#diplay book category details in Manage category
def get_cat(request):
    try:
        ob=bcat.objects.all()
        data={}
        if(ob):
            value=serializers.serialize("json",ob)
            data['data1']=json.loads(value)
            #print(data)
            return JsonResponse(data,safe=False)
        else:
            return HttpResponse("no data")
    except Exception as e:
        print(e)
        return HttpResponse("error")
def cat_det(request):
    try:
        bcid=request.GET.get("bcid")
        ob=bcat.objects.get(bcid=bcid)
        cn=ob.bcats
        cd=ob.bcatdec
        a=[cn,cd]
        #print(cn,cd)
        return JsonResponse(a,safe=False)
            #return HttpResponse("none")
    except Exception as e:
        print(e)
        return HttpResponse("hh")
def delt_cat(request):
    try:
        bcid=request.GET.get("cid")
        ob=bcat.objects.get(bcid=bcid)
        ob.delete()
        return HttpResponse("deleted")
    except Exception as e:
        return HttpResponse(e)
def get_book(request):
    try:
        ob=books.objects.all()
        data={}
        if(ob):
            value=serializers.serialize("json",ob)
            data['data2']=json.loads(value)
            return JsonResponse(data,safe=True)
        else:
            return HttpResponse("none")
    except Exception as e:
        return HttpResponse(e)
def book_det(request):
    bid=request.GET.get("bid")
    try:
        obj=books.objects.get(bid=bid)
        a=[obj.bname,obj.bcat,obj.bauthor,obj.bcopy]
        return JsonResponse(a,safe=False)
    except Exception as e:
        print(e)
        return HttpResponse("error")
def delete_book(request):
    try:
        bid=request.GET.get("bid")
        ob=books.objects.get(bid=bid)
        ob.delete()
        return HttpResponse("deleted")
    except Exception as e:
        return HttpResponse(e)
def file_upload(request):
    try:
        print("hii")
        file_name=request.POST.get("file1")
        bid=request.POST.get("bid")
        bname=request.POST.get("bname")
        bcat=request.POST.get("bcat")
        bauth=request.POST.get("bauth")
        bnum=request.POST.get("bnum")
        file1=request.FILES["file1"]
        fs=FileSystemStorage("library\\static\\images\\books\\")
        fs.save(file_name,file1)
        ob=books(bid=bid,bname=bname,bcat=bcat,bauthor=bauth,bcopy=bnum,bimage=file1)
        ob.save()


        return render(request,'adminpage.html',{})
    except Exception as e:
        print(e)
        return HttpResponse(e)
#Books
def list_books(request):
    print("hii")
    try:
        bcat=request.GET.get("bcat")
        if(bcat=="All"):
            obj=books.objects.all()
        else:
            obj=books.objects.filter(bcat=bcat)
        data={}
        if(obj):
            value=serializers.serialize("json",obj)
            data['data5']=json.loads(value)
            print(data)
            return JsonResponse(data,safe=False)
        else:
            return JsonResponse("null")
    except Exception as e:
        return HttpResponse(e)
def book_transaction(request):
    try:
        ct=time.ctime()
        bid=request.GET.get("bid")
        umail=request.GET.get("umail")
        uname=request.GET.get("uname")
        bname=request.GET.get("bname")
        bstatus=request.GET.get("bstatus")
        ob=btrans(bid=bid,uid=umail,uname=uname,bname=bname,status=bstatus,tdate=ct)
        ob.save()
        return HttpResponse("done")
    except Exception as e:
        print(e)
        return HttpResponse(e)
def get_trans_data(request):
    print("hii")
    try:
        obj=btrans.objects.all()
        data={}
        if(obj):
            value=serializers.serialize("json",obj)
            data['data2']=json.loads(value)
            return JsonResponse(data,safe=False)
        else:
            print(e)
            return HttpResponse("none")

    except Exception as e:
        return HttpResponse("error")
def  get_user_trans(request):
    #print("hello")
    try:
        if request.session.has_key("user"):
            umail=request.session["user"]
            print(umail)
            ob=btrans.objects.filter(uid=umail)
            data={}
            print(ob)
            if(ob):
                value=serializers.serialize("json",ob)
                data['data2']=json.loads(value)
                print(data)
            #print("hiii")
                return JsonResponse(data,safe=False)
            else:
                return HttpResponse("none")
        else:
            return HttpResponse("none")
    except Exception as e:
        print(e)
        return HttpResponse("none")
def status_update(request):
    try:
        tid=request.GET.get("tid")
        status=request.GET.get("bstatus")
        ob=btrans.objects.get(tid=tid)
        ob.status=status
        ob.save()
        return HttpResponse("success")
    except Exception as e:
        return HttpResponse(e)
def trns_delete(request):
    try:
        tid=request.GET.get("tid")
        ob=btrans.objects.get(tid=tid)
        ob.delete()
        return HttpResponse("deleted")
    except Exception as e:
        return HttpResponse(e)
#update category
def change_cat(request):
    try:
        cid=request.GET.get("cid")
        cname=request.GET.get("cname")
        cdesc=request.GET.get("cdesc")
        ob=bcat.objects.get(bcid=cid)
        if(ob):
            ob.bcats=cname
            ob.bcatdec=cdesc
            ob.save()
            return HttpResponse("changes saved")
    except Exception as e:
        return HttpResponse(e)
#update book
def change_book(request):
    try:
        bid=request.GET.get("bid")
        bname=request.GET.get("bname")
        bcat=request.GET.get("bcat")
        bauth=request.GET.get("bauth")
        bnum=request.GET.get("bnum")
        ob=books.objects.get(bid=bid)
        if(ob):
            ob.bname=bname
            ob.bcat=bcat
            ob.bauthor=bauth
            ob.bcopy=bnum
            ob.save()
            return HttpResponse("changes saved")
        else:
            return HttpResponse("none")
    except Exception as e:
        return HttpResponse(e)          
# Create your views here.
