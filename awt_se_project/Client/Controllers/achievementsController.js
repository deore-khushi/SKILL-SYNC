/* ============================================================
   SkillSync - Achievements Controller
   ------------------------------------------------------------
   Handles:
     - achievement demo data
     - summary counts (total / unlocked / locked)
     - category filtering
     - progress percentage calculation
     - automatic unlocking when current >= target
     - latest earned achievement
   NOTE: No Skill Token / wallet logic lives here.
         That belongs to the separate Skill Wallet page.
   ============================================================ */

app.controller("AchievementsController", function ($scope) {

    /* --------------------------------------------------------
       1. UI STATE
       -------------------------------------------------------- */

    // Filter buttons shown above the achievement sections
    $scope.categories = ["All", "Learning", "Teaching", "Collaboration", "Community"];

    // Currently selected filter
    $scope.selectedCategory = "All";

    // Only the real categories (used to render the grouped sections)
    $scope.sections = [
        { name: "Learning", icon: "fa-book-open", blurb: "Skills you pick up" },
        { name: "Teaching", icon: "fa-chalkboard-user", blurb: "Skills you pass on" },
        { name: "Collaboration", icon: "fa-diagram-project", blurb: "Projects you build together" },
        { name: "Community", icon: "fa-comments", blurb: "People you connect with" }
    ];

    // Mobile sidebar toggle
    $scope.sidebarOpen = false;
    $scope.toggleSidebar = function () {
        $scope.sidebarOpen = !$scope.sidebarOpen;
    };

    /* --------------------------------------------------------
       2. DEMO DATA
       ------------------------------------------------------------
       Replace this array with an API call later, e.g.
       $http.get("/api/achievements").then(...)

       Fields:
         current / target -> drive the progress bar
         unit             -> word used in the "x more ... to unlock" hint
         unlocked         -> recalculated automatically below
         earnedDate       -> "DD Mon YYYY"
       -------------------------------------------------------- */

    $scope.achievements = [

        /* ---------- Learning ---------- */
        {
            id: 1,
            title: "First Step",
            description: "Learn your first skill",
            category: "Learning",
            icon: "fa-seedling",
            unit: "skill",
            current: 1,
            target: 1,
            unlocked: true,
            earnedDate: "12 Aug 2026"
        },
        {
            id: 2,
            title: "Skill Collector",
            description: "Learn 5 different skills",
            category: "Learning",
            icon: "fa-layer-group",
            unit: "skills",
            current: 3,
            target: 5,
            unlocked: false,
            earnedDate: null
        },
        {
            id: 3,
            title: "Knowledge Seeker",
            description: "Complete 10 learning sessions",
            category: "Learning",
            icon: "fa-book-open",
            unit: "sessions",
            current: 10,
            target: 10,
            unlocked: true,
            earnedDate: "05 Sep 2026"
        },
        {
            id: 4,
            title: "Dedicated Learner",
            description: "Maintain a 7-day learning streak",
            category: "Learning",
            icon: "fa-fire",
            unit: "days",
            current: 4,
            target: 7,
            unlocked: false,
            earnedDate: null
        },

        /* ---------- Teaching ---------- */
        {
            id: 5,
            title: "First Teacher",
            description: "Teach your first skill",
            category: "Teaching",
            icon: "fa-chalkboard-user",
            unit: "skill",
            current: 1,
            target: 1,
            unlocked: true,
            earnedDate: "18 Sep 2026"
        },
        {
            id: 6,
            title: "Knowledge Sharer",
            description: "Teach 5 students",
            category: "Teaching",
            icon: "fa-share-nodes",
            unit: "students",
            current: 5,
            target: 5,
            unlocked: true,
            earnedDate: "15 Sep 2026"
        },
        {
            id: 7,
            title: "Helpful Mentor",
            description: "Help 10 students",
            category: "Teaching",
            icon: "fa-hands-helping",
            unit: "students",
            current: 6,
            target: 10,
            unlocked: false,
            earnedDate: null
        },
        {
            id: 8,
            title: "Skill Mentor",
            description: "Complete 20 teaching sessions",
            category: "Teaching",
            icon: "fa-graduation-cap",
            unit: "sessions",
            current: 9,
            target: 20,
            unlocked: false,
            earnedDate: null
        },

        /* ---------- Collaboration ---------- */
        {
            id: 9,
            title: "Team Player",
            description: "Join your first project",
            category: "Collaboration",
            icon: "fa-user-group",
            unit: "project",
            current: 1,
            target: 1,
            unlocked: true,
            earnedDate: "20 Aug 2026"
        },
        {
            id: 10,
            title: "Connector",
            description: "Connect with 10 students",
            category: "Collaboration",
            icon: "fa-network-wired",
            unit: "students",
            current: 10,
            target: 10,
            unlocked: true,
            earnedDate: "01 Sep 2026"
        },
        {
            id: 11,
            title: "Project Builder",
            description: "Complete your first project",
            category: "Collaboration",
            icon: "fa-diagram-project",
            unit: "project",
            current: 0,
            target: 1,
            unlocked: false,
            earnedDate: null
        },
        {
            id: 12,
            title: "Collaborator",
            description: "Participate in 5 projects",
            category: "Collaboration",
            icon: "fa-people-carry-box",
            unit: "projects",
            current: 2,
            target: 5,
            unlocked: false,
            earnedDate: null
        },

        /* ---------- Community ---------- */
        {
            id: 13,
            title: "First Connection",
            description: "Make your first connection",
            category: "Community",
            icon: "fa-user-plus",
            unit: "connection",
            current: 1,
            target: 1,
            unlocked: true,
            earnedDate: "10 Aug 2026"
        },
        {
            id: 14,
            title: "Active Member",
            description: "Complete 10 community interactions",
            category: "Community",
            icon: "fa-comments",
            unit: "interactions",
            current: 10,
            target: 10,
            unlocked: true,
            earnedDate: "12 Sep 2026"
        },
        {
            id: 15,
            title: "Community Helper",
            description: "Receive 5 positive reviews",
            category: "Community",
            icon: "fa-star",
            unit: "reviews",
            current: 3,
            target: 5,
            unlocked: false,
            earnedDate: null
        }
    ];

    /* --------------------------------------------------------
       3. DATE HELPERS
       "18 Sep 2026" <-> JavaScript Date
       -------------------------------------------------------- */

    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function parseDate(text) {
        if (!text) { return null; }
        var parts = text.split(" ");                 // ["18", "Sep", "2026"]
        var month = MONTHS.indexOf(parts[1]);
        if (month === -1) { return null; }
        return new Date(parseInt(parts[2], 10), month, parseInt(parts[0], 10));
    }

    function formatDate(date) {
        var day = date.getDate();
        if (day < 10) { day = "0" + day; }
        return day + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
    }

    /* --------------------------------------------------------
       4. AUTOMATIC UNLOCK
       If current >= target the achievement unlocks by itself and
       gets today's date when it does not already have one.
       -------------------------------------------------------- */

    $scope.refreshUnlockStatus = function () {
        angular.forEach($scope.achievements, function (item) {
            if (item.current >= item.target) {
                item.unlocked = true;
                if (!item.earnedDate) {
                    item.earnedDate = formatDate(new Date());
                }
            } else {
                item.unlocked = false;
                item.earnedDate = null;
            }
        });
        buildGroups();
    };

    /* --------------------------------------------------------
       5. GROUPING
       The achievements are grouped once so ng-repeat always gets
       the same array reference (keeps the digest cycle cheap).
       Call buildGroups() again if the data changes.
       -------------------------------------------------------- */

    $scope.groups = {};

    function buildGroups() {
        $scope.groups = {};
        angular.forEach($scope.sections, function (section) {
            $scope.groups[section.name] = [];
        });
        angular.forEach($scope.achievements, function (item) {
            if (!$scope.groups[item.category]) {
                $scope.groups[item.category] = [];
            }
            $scope.groups[item.category].push(item);
        });
    }

    // Achievements belonging to one category
    $scope.getByCategory = function (category) {
        return $scope.groups[category] || [];
    };

    // Should this section be rendered for the current filter?
    $scope.isSectionVisible = function (category) {
        if ($scope.selectedCategory !== "All" && $scope.selectedCategory !== category) {
            return false;
        }
        return $scope.getByCategory(category).length > 0;
    };

    /* --------------------------------------------------------
       6. CATEGORY FILTER
       -------------------------------------------------------- */

    $scope.setCategory = function (category) {
        $scope.selectedCategory = category;
    };

    $scope.isActiveCategory = function (category) {
        return $scope.selectedCategory === category;
    };

    // How many cards are visible right now (drives the empty state)
    $scope.visibleCount = function () {
        var count = 0;
        angular.forEach($scope.sections, function (section) {
            if ($scope.isSectionVisible(section.name)) {
                count += $scope.getByCategory(section.name).length;
            }
        });
        return count;
    };

    /* --------------------------------------------------------
       7. SUMMARY COUNTS
       -------------------------------------------------------- */

    $scope.totalCount = function () {
        return $scope.achievements.length;
    };

    $scope.unlockedCount = function () {
        var count = 0;
        angular.forEach($scope.achievements, function (item) {
            if (item.unlocked === true) { count++; }
        });
        return count;
    };

    $scope.lockedCount = function () {
        return $scope.totalCount() - $scope.unlockedCount();
    };

    // Overall completion, used by the thin bar under the summary cards
    $scope.completionPercent = function () {
        if ($scope.totalCount() === 0) { return 0; }
        return Math.round(($scope.unlockedCount() / $scope.totalCount()) * 100);
    };

    /* --------------------------------------------------------
       8. PROGRESS HELPERS
       -------------------------------------------------------- */

    // (current / target) x 100, never above 100
    $scope.getProgress = function (item) {
        if (!item || !item.target) { return 0; }
        var percent = (item.current / item.target) * 100;
        return Math.min(100, Math.round(percent));
    };

    // Width string for the inline style of the progress bar fill
    $scope.getProgressWidth = function (item) {
        return $scope.getProgress(item) + "%";
    };

    // "2 more skills to unlock"
    $scope.getRemainingText = function (item) {
        var remaining = item.target - item.current;
        if (remaining <= 0) { return "Ready to unlock"; }
        return remaining + " more " + item.unit + " to unlock";
    };

    /* --------------------------------------------------------
       9. LATEST ACHIEVEMENT
       The unlocked achievement with the most recent earned date.
       Ties are broken by the higher id (newest record wins).
       -------------------------------------------------------- */

    $scope.getLatestAchievement = function () {
        var latest = null;
        var latestTime = -1;

        angular.forEach($scope.achievements, function (item) {
            if (!item.unlocked) { return; }

            var date = parseDate(item.earnedDate);
            var time = date ? date.getTime() : 0;

            if (time > latestTime || (time === latestTime && latest && item.id > latest.id)) {
                latest = item;
                latestTime = time;
            }
        });

        return latest;
    };

    /* --------------------------------------------------------
       10. INIT
       -------------------------------------------------------- */

    $scope.init = function () {
        $scope.refreshUnlockStatus();   // also builds the groups
    };

    $scope.init();
});