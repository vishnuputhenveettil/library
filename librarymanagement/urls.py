"""librarymanagement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from library.views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$',fpage,name='fpage'),
    url(r'admin_login',admin_login,name='admin_login'),
    url(r'admin_page',admin_page,name="admin_page"),
    url(r'user_reg',user_reg,name='user_reg'),
    url(r'user_log',user_log,name='user_log'),
    url(r'user_page',user_page,name="user_page"),
    url(r'current',current,name='current'),
    url(r'add_cat',add_cat,name="add_cat"),
    url(r'get_cat',get_cat,name='get_cat'),
    url(r'cat_det',cat_det,name='cat_det'),
    url(r'change_cat',change_cat,name="change_cat"),
    url(r'delt_cat',delt_cat,name='delt_cat'),
    url(r'add_book',add_book,name='add_book'),
    url(r'change_book',change_book,name="change_book"),
    url(r'get_book',get_book,name='get_book'),
    url(r'book_det',book_det,name='book_det'),
    url(r'delete_book',delete_book,name="delete_book"),
    url(r'file_upload',file_upload,name='file_upload'),
    url(r'list_books',list_books,name="list_books"),
    url(r'book_transaction',book_transaction,name='book_transaction'),
    url(r'get_trans_data',get_trans_data,name='get_trans_data'),
    url(r'get_user_trans',get_user_trans,name='get_user_trans'),
    url(r'status_update',status_update,name='status_update'),
    url(r'trns_delete',trns_delete,name="trns_delete"),
]
