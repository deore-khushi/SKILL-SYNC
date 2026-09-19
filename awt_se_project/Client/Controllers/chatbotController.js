app.controller("ChatbotController", function ($scope) {

    $scope.isChatOpen = false;
    $scope.userMessage = "";
    $scope.messages = [
        {
            type: "bot",
            text: "Hi! 👋 How can I help you with SkillSync today?"
        }
    ];

    // Toggle chat window
    $scope.toggleChat = function () {
        $scope.isChatOpen = !$scope.isChatOpen;
    };

    // Close chat
    $scope.closeChat = function () {
        $scope.isChatOpen = false;
    };

    // Send message
    $scope.sendMessage = function () {
        if (!$scope.userMessage || $scope.userMessage.trim() === "") {
            return;
        }

        // Add user message
        $scope.messages.push({
            type: "user",
            text: $scope.userMessage
        });

        var userText = $scope.userMessage;
        $scope.userMessage = "";

        // Fake bot reply (you can replace this later with real API)
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.messages.push({
                    type: "bot",
                    text: "Thanks for your message! Our team will help you soon. 😊"
                });
            });
        }, 800);
    };

    // Send on Enter key
    $scope.handleKeyPress = function (event) {
        if (event.keyCode === 13) {
            $scope.sendMessage();
        }
    };
});