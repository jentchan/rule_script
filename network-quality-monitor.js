(function() {
    const targetUrl = "https://www.baidu.com";  // 目标 URL，用于检测网络质量
    const timeout = 3000;  // 设置请求超时时间，单位毫秒
    const retryDelay = 5000;  // 网络质量差时的重试间隔，单位毫秒

    // 检查网络质量
    function checkNetworkQuality() {
        fetch(targetUrl, {
            method: 'GET',
            timeout: timeout
        })
        .then(response => {
            if (response.ok) {
                console.log("网络正常");
            } else {
                console.error("网络异常");
                notifyUser("网络质量差，请检查网络连接", "red");
            }
        })
        .catch(error => {
            console.error("网络请求失败:", error);
            notifyUser("网络质量差，请检查网络连接", "red");
        });
    }

    // 发送通知
    function notifyUser(message, color) {
        if (window.Notification && Notification.permission === "granted") {
            new Notification("网络质量警告", {
                body: message,
                icon: "https://www.baidu.com/favicon.ico"
            });
        } else {
            alert(message);  // 如果没有权限，就用 alert 提示
        }
    }

    // 每隔 10 秒钟检测一次网络质量
    setInterval(checkNetworkQuality, 10000);  // 每 10 秒检测一次网络质量
})();
