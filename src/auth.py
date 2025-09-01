from chat_db import create_user, authenticate_user

def login_or_register():
    print("Welcome to Research Bot!")
    choice = input("Do you want to (l)ogin or (r)egister? ").lower()
    
    username = input("Username: ").strip()
    password = input("Password: ").strip()

    if choice == "r":
        user_id = create_user(username, password)
        if user_id:
            print("Registration successful!")
            return user_id
        else:
            print("Username already exists. Try logging in.")
            return login_or_register()
    elif choice == "l":
        user_id = authenticate_user(username, password)
        if user_id:
            print("Login successful!")
            return user_id
        else:
            print("Invalid credentials. Try again.")
            return login_or_register()
    else:
        print("Invalid choice. Try again.")
        return login_or_register()
