export function checkLogin() {
    'use client';
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.uid) {
        return false;
    } else {
        return true;
    }
}
'use server';
export function redirectIfNotLoggedIn() {
    if (!checkLogin()) {
        window.location.href = "/login";
    }
}

export function getUserId() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.uid || null;
}