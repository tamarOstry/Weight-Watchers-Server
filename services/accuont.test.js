

const userService = require('./account.js');

test('get user by email & password', ()=>{
    let user = userService.getByEmailPassword('tl@gmail.com','56').then(()=>{
        expect(JSON.parse(user)).toBe(1)
    })
})