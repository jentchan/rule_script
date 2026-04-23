(function() {
    try {
        const targetUrl = "https://www.baidu.com";  // 目标 URL
        const timeout = 3000;
        const retryDelay = 5000;

        let attemptCount = 0;

        function checkNetworkQuality() {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            fetch(targetUrl, {
                method: 'GET',
                signal: controller.signal
            })
            .then(response => {
                clearTimeout(timeoutId);
                if (response.ok) {
                    console.log("网络正常");
                    attemptCount = 0;
                } else {
                    console.error("网络异常");
                }
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error("网络请求失败:", error);
            });
        }

        setInterval(checkNetworkQuality, 3000);
    } catch (err) {
        console.error("脚本执行错误:", err);
    }
})();
