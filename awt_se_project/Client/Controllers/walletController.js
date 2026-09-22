app.controller("WalletController", function ($scope) {

  /* ---------- UI state ---------- */
  $scope.sidebarOpen = false;
  $scope.toggleSidebar = function () {
    $scope.sidebarOpen = !$scope.sidebarOpen;
  };

  $scope.profileOpen = false;
  $scope.toggleProfileMenu = function () {
    $scope.profileOpen = !$scope.profileOpen;
  };

  /* ---------- Wallet numbers ---------- */
  $scope.balance     = 34;
  $scope.totalEarned = 52;
  $scope.totalSpent  = 18;

  /* ---------- Transaction filters ---------- */
  $scope.txFilters = ["All", "Earned", "Spent"];
  $scope.selectedTxFilter = "All";

  $scope.setTxFilter = function (f) {
    $scope.selectedTxFilter = f;
  };

  /* ---------- Demo transactions ---------- */
  $scope.transactions = [
    { id: 1, type: "earn",  title: "Taught React Basics",       category: "Teaching",   amount: 4, date: "18 Sep 2026" },
    { id: 2, type: "spend", title: "Learned UI Design",         category: "Learning",   amount: 2, date: "16 Sep 2026" },
    { id: 3, type: "earn",  title: "Mentored 3 students",       category: "Teaching",   amount: 6, date: "14 Sep 2026" },
    { id: 4, type: "spend", title: "Python for Beginners",      category: "Learning",   amount: 3, date: "12 Sep 2026" },
    { id: 5, type: "earn",  title: "Completed teaching streak", category: "Bonus",      amount: 5, date: "10 Sep 2026" },
    { id: 6, type: "spend", title: "Advanced CSS workshop",     category: "Learning",   amount: 3, date: "08 Sep 2026" },
    { id: 7, type: "earn",  title: "Shared project template",   category: "Community",  amount: 2, date: "05 Sep 2026" }
  ];

  $scope.filteredTransactions = function () {
    if ($scope.selectedTxFilter === "All") return $scope.transactions;
    if ($scope.selectedTxFilter === "Earned") {
      return $scope.transactions.filter(function (t) { return t.type === "earn"; });
    }
    return $scope.transactions.filter(function (t) { return t.type === "spend"; });
  };

  /* ---------- Earn tasks ---------- */
  $scope.earnTasks = [
    { icon: "🎓", title: "Teach a skill",        description: "Host a 1-hour session",     reward: 4 },
    { icon: "🔥", title: "7-day teaching streak", description: "Teach every day for a week", reward: 5 },
    { icon: "👥", title: "Help 5 students",       description: "Complete mentoring sessions", reward: 6 },
    { icon: "📄", title: "Share a resource",      description: "Upload notes or a template", reward: 1 }
  ];

  /* ---------- Spend options ---------- */
  $scope.spendOptions = [
    { icon: "📚", title: "Beginner skill session", description: "1-hour guided learning", cost: 2 },
    { icon: "🚀", title: "Intermediate workshop",  description: "Deep-dive session",     cost: 3 },
    { icon: "⭐", title: "Premium skill track",    description: "Full multi-day course",  cost: 8 },
    { icon: "🎯", title: "1-on-1 mentoring",       description: "Personal coaching call", cost: 5 }
  ];
});