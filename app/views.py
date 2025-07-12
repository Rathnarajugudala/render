from django.shortcuts import render, redirect,get_object_or_404
from .models import Product, Cart
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

def home(request):
    return render(request,"home.html")
def product_list(request):
    products = Product.objects.all()
    return render(request, "products.html",{'products':products})

def product_detail(request,product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request,'product_detail.html',{'product':product})

@login_required(login_url='/login/')
def view_cart(request):
    cart_items = Cart.objects.filter(user=request.user)
    total_price = sum(item.total_price() for item in cart_items)
    return render(request, "cart.html",{'total_price':total_price,'cart_items':cart_items})

@login_required(login_url='/login/')
def add_to_cart(request, product_id):
    product = Product.objects.get(id=product_id)
    cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('cart')

@login_required
def remove_from_cart(request, product_id):
    Cart.objects.filter(user=request.user, product_id=product_id).delete()
    return redirect("cart")

@login_required
def update_cart(request, product_id):
    if request.method == 'POST':
        quantity = int(request.POST.get('quantity'))
        cart_item = get_object_or_404(Cart, user=request.user, product_id=product_id)
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()
    return redirect("cart")

def user_register(request):
    if request.method == 'POST':
        name = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        c_pass = request.POST.get('confirm_password')

        if not name or not email or not password or not c_pass:
                messages.error(request,'Enter all fields')
                return redirect('register')
        
        if password != c_pass:
            messages.error(request,'passwped not match')
            return redirect('register')
        
        if password == name:
            messages.error(request,'password and username should not equal')
            return redirect('register')
        
        if User.objects.filter(username=name).exists():
            messages.error(request,'username alredy exists')
            return redirect('login')
        
        if User.objects.filter(email=email).exists():
            messages.error(request,'email alredy exists')
            return redirect('login')
        
        user = User.objects.create_user(username=name,email=email,password=password)
        user.save()
        messages.success(request,'registrations completed')
        return redirect('login')
    
    return render(request,'register.html')

def user_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect("product_list")
        else:
            messages.error(request, "Invalid credentials")
    return render(request, "login.html")

def user_logout(request):
    logout(request)
    return redirect("home")
