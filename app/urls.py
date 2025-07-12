
from django.urls import path
from .views import product_list, add_to_cart, view_cart, remove_from_cart,user_login,user_logout,user_register,update_cart,product_detail,home

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',home,name='home'),
    path('products/', product_list, name="product_list"),
    path('details/<int:product_id>/,',product_detail,name='product_detail'),
    path('cart/', view_cart, name="view_cart"),
    path('cart/add/<int:product_id>/', add_to_cart, name="add_to_cart"),
    path('cart/remove/<int:product_id>/', remove_from_cart, name="remove_from_cart"),
    path('update_cart/<int:product_id>/',update_cart, name='update_cart'),


    path('wishlist/', view_cart, name="cart"),
    path('wishlist/add/<int:product_id>/', add_to_cart, name="wishlist_to_cart"),
    path('wishlist/remove/<int:product_id>/', remove_from_cart, name="wishlist_from_cart"),
    
    
    
]

urlpatterns += [
    path('login/', user_login, name="login"),
    path('register/',user_register,name='register'),
    path('logout/', user_logout, name="logout"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
