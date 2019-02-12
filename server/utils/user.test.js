const expect = require('expect');

const { Users } = require('./user');


describe('Users', () => {
  it("should add new user", () => {
    const users = new Users();
    const user = {
      id: 'randomID',
      name: 'Phan',
      room: 'dev'
    }
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user])
  })
})