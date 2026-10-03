from django.db import models
from django.contrib.auth.models import User


class About(models.Model):
    name = models.CharField(max_length=100, default="Rishi Srivastava")
    title = models.CharField(max_length=200)
    description = models.TextField()
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    cv_file = models.FileField(upload_to='cv/', null=True, blank=True)
    experience_years = models.IntegerField(default=0)
    projects_completed = models.IntegerField(default=0)
    technologies_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    technologies = models.CharField(max_length=300, help_text="Comma-separated values")
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    proficiency = models.IntegerField(default=50)  # 0-100

    def __str__(self):
        return f"{self.name} - {self.category}"


class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    current = models.BooleanField(default=False)
    description = models.TextField()

    def __str__(self):
        return f"{self.position} at {self.company}"


class Contact(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.email


class Message(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"


# ── EDUCATION ────────────────────────────────────────────────────────────────
class Education(models.Model):
    """College / University level education (singleton-ish, but allows multiple)."""
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    degree = models.CharField(max_length=200)
    stream = models.CharField(max_length=200, blank=True, help_text="e.g. Computer Science and Engineering")
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    max_cgpa = models.DecimalField(max_digits=4, decimal_places=2, default=10)
    start_year = models.IntegerField(blank=True, null=True)
    end_year = models.IntegerField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-end_year']

    def __str__(self):
        return self.institution


class SchoolEducation(models.Model):
    """High school education - one entry for Class 10, one for Class 12."""
    LEVEL_CHOICES = [
        ('10', 'Class 10'),
        ('12', 'Class 12'),
    ]
    level = models.CharField(max_length=2, choices=LEVEL_CHOICES)
    school_name = models.CharField(max_length=200)
    board = models.CharField(max_length=100, blank=True, help_text="e.g. CBSE, ICSE, UP Board")
    stream = models.CharField(max_length=100, blank=True, help_text="e.g. PCM (for Class 12 only)")
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    start_year = models.IntegerField()
    end_year = models.IntegerField()

    class Meta:
        ordering = ['start_year']
        verbose_name = "School Education"
        verbose_name_plural = "School Education"

    def __str__(self):
        return f"{self.school_name} ({self.get_level_display()})"


# ── CERTIFICATIONS ───────────────────────────────────────────────────────────
class Certification(models.Model):
    name = models.CharField(max_length=200)
    provider = models.CharField(max_length=100)
    icon = models.CharField(max_length=10, blank=True, default='🏆', help_text="Emoji shown as a placeholder image")
    image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    credential_url = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


# ── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
class Achievement(models.Model):
    """A coding-profile achievement card (HackerRank, LeetCode, GitHub, CodeChef, ...)."""
    platform = models.CharField(max_length=100, help_text="e.g. HackerRank, LeetCode, GitHub, CodeChef")
    username = models.CharField(max_length=100, help_text="Profile id / username on that platform")
    profile_url = models.URLField(blank=True, null=True)
    logo_text = models.CharField(max_length=10, blank=True, help_text="Short logo text e.g. HR, LC, GH, CC")
    color = models.CharField(max_length=20, blank=True, default='#8b5cf6', help_text="Accent color (hex)")
    stat = models.CharField(max_length=50, blank=True, help_text="Primary stat e.g. '5 Star', '1200+'")
    stat_label = models.CharField(max_length=100, blank=True, help_text="e.g. 'Problems Solved', 'Rating'")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.platform} - {self.username}"


class GithubStat(models.Model):
    """One of the small stat boxes shown inside the GitHub achievement card."""
    achievement = models.ForeignKey(Achievement, related_name='github_stats', on_delete=models.CASCADE)
    label = models.CharField(max_length=50, help_text="e.g. Repos, Followers, Stars, Contributions")
    value = models.CharField(max_length=50, help_text="e.g. 24, 1.2k")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.achievement.platform} - {self.label}: {self.value}"