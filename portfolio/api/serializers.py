from rest_framework import serializers
from .models import (
    About, Project, Skill, Experience, Contact, Message,
    Education, SchoolEducation, Certification, Achievement, GithubStat,
)


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']


# ── EDUCATION ────────────────────────────────────────────────────────────────
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class SchoolEducationSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = SchoolEducation
        fields = '__all__'


# ── CERTIFICATIONS ───────────────────────────────────────────────────────────
class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'


# ── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
class GithubStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = GithubStat
        fields = ['id', 'label', 'value', 'order']


class AchievementSerializer(serializers.ModelSerializer):
    github_stats = GithubStatSerializer(many=True, read_only=True)

    class Meta:
        model = Achievement
        fields = '__all__'