// 45-17

new Promise(() => { })
    .finally(() => console.log('finally')); // finally