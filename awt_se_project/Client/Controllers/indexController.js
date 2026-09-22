app.controller("IndexController", function ($scope, $http) {

    $scope.hero = {
        title: "Learn. Teach. Collaborate.",
        subtitle: "Connect with skilled students, exchange knowledge using Skill Tokens, and build amazing project teams."
    };

    $scope.features = [

        { title: "Teach Skills", desc: "Share your knowledge with others." },

        { title: "Learn Skills", desc: "Learn from talented students." },

        { title: "Earn Tokens", desc: "Receive Skill Tokens for teaching." },

        { title: "Find Teams", desc: "Create and join project teams." },

        { title: "Chat", desc: "Connect with students instantly." },

        { title: "Portfolio", desc: "Build your profile and achievements." }

    ];

    $scope.steps = [

        "Create Account",

        "Receive 5 Free Skill Tokens",

        "Learn or Teach Skills",

        "Earn More Tokens",

        "Join Project Teams"

    ];


    $scope.faq = [

        {
            question: "Is SkillSync free?",
            answer: "Yes, every student gets 5 free Skill Tokens."
        },

        {
            question: "Can I teach?",
            answer: "Yes, any verified student can teach."
        },

        {
            question: "How do I earn tokens?",
            answer: "By teaching skills to other students."
        }

    ];
});