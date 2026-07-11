---
title: Screening Round
sidebar_position: 4
---

# Screening Round

- [https://chatgpt.com/c/6a27c1fa-df20-8323-97f5-7c11557b0472](https://chatgpt.com/c/6a27c1fa-df20-8323-97f5-7c11557b0472)

function memoize(func) \{
    const cache \= \{\};

    return function (num) \{
        if (cache.hasOwnProperty(num)) \{
            return cache\[num\];
        \}

        const result \= func(num);
        cache\[num\] \= result;
        return result;
    \};
\}

function memoize(func) \{
    const cache \= new Map();

    return function (...args) \{
        const key \= JSON.stringify(args);

        if (cache.has(key)) \{
            return cache.get(key);
        \}

        const result \= func.apply(this, args);
        cache.set(key, result);

        return result;
    \};
\}

function func(n) \{
    const max \= 1e4;
    const rand\_int \= Math.floor(Math.random() \* max);
    return n \+ rand\_int;
\}

const memoizedFunc \= memoize(func);

console.log(memoizedFunc(5)); // computed
console.log(memoizedFunc(5)); // cached

console.log(memoizedFunc(8)); // computed
console.log(memoizedFunc(8)); // cached
