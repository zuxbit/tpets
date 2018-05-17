from django.contrib.admin import AdminSite
from django.contrib.auth.forms import AuthenticationForm

class OwnersAdminSite(AdminSite):
    site_header = 'Owners\' admin site'
    login_form = AuthenticationForm  # force allow non-staff members to login

    def has_permission(self, request):
        return request.user.is_active  # let non-staff members to perform actions


owners_admin = OwnersAdminSite('owners_admin')  # restricted admin only for pet owners
admin = AdminSite()  # standard staff's admin
