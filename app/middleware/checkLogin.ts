export function checkLogin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.uid) {
        return false;
    } else {
        return true;
    }
}

export function redirectIfNotLoggedIn() {
    if (!checkLogin()) {
        window.location.href = "/login";
    }
}

export function getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.uid || null;
}