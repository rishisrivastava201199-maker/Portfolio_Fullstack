from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AboutViewSet, ProjectViewSet, SkillViewSet,
    ExperienceViewSet, ContactViewSet, MessageViewSet,
    EducationViewSet, SchoolEducationViewSet,
    CertificationViewSet, AchievementViewSet,
    about, submit_message, login_user,
)

router = DefaultRouter()
router.register(r'about',          AboutViewSet,          basename='about')
router.register(r'projects',       ProjectViewSet,        basename='projects')
router.register(r'skills',         SkillViewSet,          basename='skills')
router.register(r'experience',     ExperienceViewSet,     basename='experience')
router.register(r'contact',        ContactViewSet,        basename='contact')
router.register(r'messages',       MessageViewSet,        basename='messages')
router.register(r'education',      EducationViewSet,      basename='education')
router.register(r'school-education', SchoolEducationViewSet, basename='school-education')
router.register(r'certifications', CertificationViewSet,  basename='certifications')
router.register(r'achievements',   AchievementViewSet,    basename='achievements')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/',      login_user,      name='login'),
    path('contact/submit/',  submit_message,  name='submit_message'),
]