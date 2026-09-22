app.controller("ResumeController", function ($scope, $http) {
  $scope.resume = {
    personalInfo: {},
    education: [],
    skills: { technical: [], soft: [], tools: [] },
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
  };

  $scope.newSkill = { technical: "", soft: "", tools: "" };
  $scope.completion = 0;
  $scope.saving = false;
  $scope.showResume = false;
  $scope.template = "modern";

  // Dashboard UI state
  $scope.sidebarOpen = false;
  $scope.profileOpen = false;
  $scope.tokens = 5;
  $scope.searchText = "";

  $scope.toggleSidebar = function () {
    $scope.sidebarOpen = !$scope.sidebarOpen;
  };

  $scope.toggleProfileMenu = function () {
    $scope.profileOpen = !$scope.profileOpen;
  };

  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest(".profile-menu")) {
      $scope.$applyAsync(function () {
        $scope.profileOpen = false;
      });
    }
  });

  $scope.$watch("sidebarOpen", function (open) {
    document.body.style.overflow = open ? "hidden" : "";
  });

  $scope.logout = function () {
    if (confirm("Sign out of SkillSync?")) {
      window.location.href = "index.html";
    }
  };

  // Clear Resume
  $scope.clearResume = function () {
    const confirmClear = confirm(
      "Are you sure you want to clear the entire resume?\nThis action cannot be undone.",
    );

    if (!confirmClear) return;

    $scope.resume = {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        bio: "",
        photo: "",
      },
      education: [],
      skills: {
        technical: [],
        soft: [],
        tools: [],
      },
      experience: [],
      projects: [],
      certifications: [],
      achievements: [],
    };

    $scope.newSkill = {
      technical: "",
      soft: "",
      tools: "",
    };

    $scope.completion = 0;
    $scope.template = "modern";

    $http
      .delete("http://localhost:3000/api/resume?userId=demo-user")
      .then(function () {
        alert("Resume cleared successfully!");
      })
      .catch(function (err) {
        console.error("Error clearing resume from database:", err);
        alert(
          "Resume cleared from form, but there was an issue deleting from database.",
        );
      });
  };

  // Load Resume
  $scope.loadResume = function () {
    $http
      .get("/api/resume?userId=demo-user")
      .then(function (res) {
        if (res.data) {
          $scope.resume = angular.merge($scope.resume, res.data);
          $scope.calculateCompletion();
        }
      })
      .catch(function (err) {
        console.error("Error loading resume:", err);
      });
  };

  $scope.loadResume();

  // Calculate Resume Completion
  $scope.calculateCompletion = function () {
    let score = 0;
    const r = $scope.resume;

    if (r.personalInfo.fullName && r.personalInfo.email) score += 20;

    if (r.education && r.education.length) score += 15;

    if (
      (r.skills.technical && r.skills.technical.length) ||
      (r.skills.tools && r.skills.tools.length)
    )
      score += 20;

    if (r.experience && r.experience.length) score += 15;

    if (r.projects && r.projects.length) score += 15;

    if (r.certifications && r.certifications.length) score += 10;

    if (r.achievements && r.achievements.length) score += 5;

    $scope.completion = score;
  };

  $scope.$watch(
    "resume",
    function () {
      $scope.calculateCompletion();
    },
    true,
  );

  // Education
  $scope.addEducation = function () {
    $scope.resume.education.push({
      degree: "",
      college: "",
      year: "",
      score: "",
    });
  };

  $scope.removeEducation = function (i) {
    $scope.resume.education.splice(i, 1);
  };

  // Experience
  $scope.addExperience = function () {
    $scope.resume.experience.push({
      company: "",
      position: "",
      duration: "",
      description: "",
    });
  };

  $scope.removeExperience = function (i) {
    $scope.resume.experience.splice(i, 1);
  };

  // Projects
  $scope.addProject = function () {
    $scope.resume.projects.push({
      name: "",
      technologies: "",
      description: "",
      link: "",
    });
  };

  $scope.removeProject = function (i) {
    $scope.resume.projects.splice(i, 1);
  };

  // Certifications
  $scope.addCertification = function () {
    $scope.resume.certifications.push({
      name: "",
      organization: "",
      date: "",
      link: "",
    });
  };

  $scope.removeCertification = function (i) {
    $scope.resume.certifications.splice(i, 1);
  };

  // Achievements
  $scope.addAchievement = function () {
    $scope.resume.achievements.push("");
  };

  $scope.removeAchievement = function (i) {
    $scope.resume.achievements.splice(i, 1);
  };

  // Skills
  $scope.addSkill = function (type) {
    const val = $scope.newSkill[type];

    if (val && val.trim()) {
      $scope.resume.skills[type].push(val.trim());
      $scope.newSkill[type] = "";
    }
  };

  $scope.removeSkill = function (type, index) {
    $scope.resume.skills[type].splice(index, 1);
  };

  // Photo
  $scope.triggerPhotoUpload = function () {
    document.getElementById("photoInput").click();
  };

  $scope.uploadPhoto = function (event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      $scope.$apply(function () {
        $scope.resume.personalInfo.photo = e.target.result;
      });
    };

    reader.readAsDataURL(file);
  };

  // Save Resume
  $scope.saveResume = function () {
    $scope.saving = true;

    const dataToSend = angular.copy($scope.resume);

    dataToSend.userId = "demo-user";

    $http
      .post("/api/resume", dataToSend)
      .then(function (res) {
        alert("Resume saved successfully!");
        console.log(res.data);
      })
      .catch(function (err) {
        alert("Error saving resume");
        console.error(err);
      })
      .finally(function () {
        $scope.saving = false;
      });
  };

  // Resume Preview
  $scope.previewResume = function () {
    $scope.showResume = true;
  };

  $scope.closeResume = function (e) {
    if (e.target.classList.contains("modal-overlay")) {
      $scope.showResume = false;
    }
  };

  // Download PDF
  $scope.downloadPDF = function () {
    $scope.showResume = true;

    setTimeout(function () {
      const element = document.getElementById("resume-paper");

      if (!element) {
        alert("Resume not found. Please open Preview first.");
        return;
      }

      const opt = {
        margin: [8, 8, 8, 8],

        filename:
          ($scope.resume.personalInfo.fullName || "Resume") + "_SkillSync.pdf",

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },

        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
        },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()

        .then(function () {
          console.log("PDF downloaded successfully");
        })

        .catch(function (err) {
          console.error("PDF Error:", err);
          alert("Failed to generate PDF. Please try again.");
        });
    }, 400);
  };

  // Scroll
  // Active section for side-nav highlight (scroll-spy)
  $scope.activeSection = "personal";

  // Scroll to section AND mark it active
  $scope.scrollTo = function (id) {
    $scope.activeSection = id;
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Scroll-spy: update activeSection while user scrolls
  (function initScrollSpy() {
    var sectionIds = [
      "personal",
      "education",
      "skills",
      "experience",
      "projects",
      "certifications",
      "achievements",
    ];

    function onScroll() {
      var scrollPos =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      var offset = 140; // account for sticky header
      var current = sectionIds[0];

      for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (el) {
          var top = el.getBoundingClientRect().top + scrollPos - offset;
          if (scrollPos >= top) {
            current = sectionIds[i];
          }
        }
      }

      if ($scope.activeSection !== current) {
        $scope.$applyAsync(function () {
          $scope.activeSection = current;
        });
      }
    }

    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            onScroll();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );

    setTimeout(onScroll, 300);
  })();
});
