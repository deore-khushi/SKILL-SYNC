app.controller('SettingsController', function ($scope, $timeout, $window) {

    // ==============================
    // HEADER
    // ==============================

    $scope.sidebarOpen = false;
    $scope.profileOpen = false;

    $scope.tokens = 5;
    $scope.searchText = "";


    // ==============================
    // SETTINGS
    // ==============================

    $scope.settings = {
        // Account
        profileVisibility: "everyone",

        // Notifications
        emailNotifications: true,
        skillMatchNotifications: true,
        messageNotifications: true,
        projectNotifications: true,
        tokenNotifications: false,

        // Privacy
        profileView: "everyone",
        showEmail: false,
        showPhone: false,
        twoFactor: false,

        // Appearance
        theme: "system",

        // Token preferences
        autoTokenUse: true,
        tokenConfirmation: false,
        projectTokenUse: true,

        // Communication
        allowConnections: true,
        allowProjects: true,
        allowNewMessages: false
    };


    // ==============================
    // TOKEN BALANCE
    // ==============================

    $scope.tokenBalance = 1250;


    // ==============================
    // SETTINGS NAVIGATION + SCROLL SPY
    // ==============================

    $scope.activeSection = "account";

    var sections = [
        "account",
        "notifications",
        "privacy",
        "appearance",
        "tokens",
        "communication",
        "help",
        "about"
    ];

    $scope.selectSection = function (section) {
        $scope.activeSection = section;

        var element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    // Scroll spy – highlights the section currently in view
    function updateActiveSection() {
        var scrollPos = $window.pageYOffset || document.documentElement.scrollTop;
        var offset = 140; // adjust if needed (header + some padding)

        var current = sections[0];

        for (var i = 0; i < sections.length; i++) {
            var el = document.getElementById(sections[i]);
            if (el) {
                var top = el.offsetTop - offset;
                if (scrollPos >= top) {
                    current = sections[i];
                }
            }
        }

        if ($scope.activeSection !== current) {
            $scope.$applyAsync(function () {
                $scope.activeSection = current;
            });
        }
    }

    // Listen to scroll
    angular.element($window).on("scroll", updateActiveSection);

    // Run once on load
    $timeout(updateActiveSection, 100);

    // Clean up when leaving the page
    $scope.$on("$destroy", function () {
        angular.element($window).off("scroll", updateActiveSection);
    });


    // ==============================
    // SIDEBAR
    // ==============================

    $scope.toggleSidebar = function () {
        $scope.sidebarOpen = !$scope.sidebarOpen;
    };


    // ==============================
    // PROFILE MENU
    // ==============================

    $scope.toggleProfileMenu = function () {
        $scope.profileOpen = !$scope.profileOpen;
    };


    // ==============================
    // MODAL
    // ==============================

    $scope.modal = null;

    $scope.openModal = function (modalName) {
        $scope.modal = modalName;
    };

    $scope.closeModal = function () {
        $scope.modal = null;
    };


    // ==============================
    // CHANGE EMAIL
    // ==============================

    $scope.newEmail = "";

    $scope.saveEmail = function () {
        if (!$scope.newEmail) {
            $scope.showToast("Please enter a new email address");
            return;
        }

        $scope.showToast("Email updated successfully");
        $scope.newEmail = "";
        $scope.closeModal();
    };


    // ==============================
    // CHANGE PASSWORD
    // ==============================

    $scope.password = {
        current: "",
        newPassword: "",
        confirmPassword: ""
    };

    $scope.savePassword = function () {
        if (!$scope.password.current ||
            !$scope.password.newPassword ||
            !$scope.password.confirmPassword) {

            $scope.showToast("Please fill all password fields");
            return;
        }

        if ($scope.password.newPassword !== $scope.password.confirmPassword) {
            $scope.showToast("Passwords do not match");
            return;
        }

        $scope.showToast("Password updated successfully");

        $scope.password = {
            current: "",
            newPassword: "",
            confirmPassword: ""
        };

        $scope.closeModal();
    };


    // ==============================
    // DELETE ACCOUNT
    // ==============================

    $scope.confirmDelete = function () {
        $scope.closeModal();
        $scope.showToast("Account deletion request submitted");
    };


    // ==============================
    // APPEARANCE / THEME
    // ==============================

    $scope.changeTheme = function () {
        var theme = $scope.settings.theme;

        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

        $scope.showToast(
            theme.charAt(0).toUpperCase() +
            theme.slice(1) +
            " mode selected"
        );
    };


    // ==============================
    // TOAST
    // ==============================

    $scope.toastVisible = false;
    $scope.toastMessage = "";

    $scope.showToast = function (message) {
        $scope.toastMessage = message;
        $scope.toastVisible = true;

        $timeout(function () {
            $scope.toastVisible = false;
        }, 2500);
    };


    // ==============================
    // LOGOUT
    // ==============================

    $scope.logout = function () {
        $scope.profileOpen = false;
        $scope.showToast("Signing out...");

        $timeout(function () {
            window.location.href = "login.html";
        }, 1000);
    };

});