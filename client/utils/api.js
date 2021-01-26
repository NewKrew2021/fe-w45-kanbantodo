const API = (function() {
    const API_URL = 'http://localhost:5000'
    function getTodoData() {
        return fetch(`${API_URL}/todos`, {
            "method": 'get',
            "Content-Type": "application/json",
        }).then((res) => {
            return res.json()
        });
    }

    return {
        getTodoData,
    };
})();

export default API;
