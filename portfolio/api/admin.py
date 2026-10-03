from django.contrib import admin
from .models import (
    About, Project, Skill, Experience, Contact, Message,
    Education, SchoolEducation, Certification, Achievement, GithubStat,
)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['title']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'created_at']
    list_filter = ['featured', 'created_at']
    search_fields = ['title', 'description']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency']
    list_filter = ['category']
    search_fields = ['name', 'category']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'start_date', 'current']
    list_filter = ['current', 'start_date']
    search_fields = ['position', 'company']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['email']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'read']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']


# ── EDUCATION ────────────────────────────────────────────────────────────────
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree', 'stream', 'cgpa', 'start_year', 'end_year', 'order']
    list_editable = ['order']


@admin.register(SchoolEducation)
class SchoolEducationAdmin(admin.ModelAdmin):
    list_display = ['school_name', 'level', 'stream', 'percentage', 'start_year', 'end_year']
    list_filter = ['level']


# ── CERTIFICATIONS ───────────────────────────────────────────────────────────
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'provider', 'icon', 'order']
    list_editable = ['order']
    search_fields = ['name', 'provider']


# ── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
class GithubStatInline(admin.TabularInline):
    model = GithubStat
    extra = 1


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['platform', 'username', 'stat', 'stat_label', 'order']
    list_editable = ['order']
    search_fields = ['platform', 'username']
    inlines = [GithubStatInline]
    
    
