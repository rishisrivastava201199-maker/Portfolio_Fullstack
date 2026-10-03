from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authtoken.models import Token
from .models import (
    About, Project, Skill, Experience, Contact, Message,
    Education, SchoolEducation, Certification, Achievement,
)
from .serializers import (
    AboutSerializer, ProjectSerializer, SkillSerializer,
    ExperienceSerializer, ContactSerializer, MessageSerializer,
    EducationSerializer, SchoolEducationSerializer,
    CertificationSerializer, AchievementSerializer,
)


# ── Helper mixin ──────────────────────────────────────────────────────────────
class PublicReadAuthenticatedWrite:
    """Read-only for everyone; write operations require authentication."""
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]


# ── ViewSets ──────────────────────────────────────────────────────────────────
class AboutViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer


class ProjectViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            qs = qs.filter(featured=True)
        return qs


class SkillViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ExperienceViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer


class ContactViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]


# ── Education ───────────────────────────────────────────────────────────────
class EducationViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class SchoolEducationViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = SchoolEducation.objects.all()
    serializer_class = SchoolEducationSerializer


# ── Certifications ─────────────────────────────────────────────────────────
class CertificationViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


# ── Achievements ──────────────────────────────────────────────────────────────
class AchievementViewSet(PublicReadAuthenticatedWrite, viewsets.ModelViewSet):
    queryset = Achievement.objects.all().prefetch_related('github_stats')
    serializer_class = AchievementSerializer


# ── Function-based views ───────────────────────────────────────────────────────
@api_view(['GET'])
@permission_classes([AllowAny])
def about(request):
    """Return the first About record (singleton)."""
    obj = About.objects.first()
    if obj:
        return Response(AboutSerializer(obj).data)
    return Response({'error': 'About data not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_message(request):
    """Public endpoint to submit a contact form message.

    Saves the message and also forwards it as an email to the site owner's
    inbox (configured via CONTACT_RECEIVER_EMAIL / DEFAULT_FROM_EMAIL in settings).
    """
    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        msg = serializer.save()

        receiver = getattr(settings, 'CONTACT_RECEIVER_EMAIL', 'rishisrivastava201199@gmail.com')
        sender = getattr(settings, 'DEFAULT_FROM_EMAIL', receiver)

        try:
            send_mail(
                subject=f"New Portfolio Message: {msg.subject or 'No Subject'}",
                message=(
                    f"You received a new message from your portfolio contact form.\n\n"
                    f"Name: {msg.name}\n"
                    f"Email: {msg.email}\n"
                    f"Subject: {msg.subject or '-'}\n\n"
                    f"Message:\n{msg.message}\n\n"
                    f"Received at: {msg.created_at}"
                ),
                from_email=sender,
                recipient_list=[receiver],
                fail_silently=True,
            )
        except Exception:
            # Never fail the request just because the email could not be sent.
            pass

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Return token for valid credentials."""
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)