const expect = require('expect');

const { Users } = require('./user');


describe('Users', () => {
  let listUsers;
  beforeEach(() => {
    listUsers = new Users();
    listUsers.users = [
      {
        id: '/123abc1',
        name: 'Phan1',
        room: 'Node course'
      },
      {
        id: '/123abc2',
        name: 'Phan2',
        room: 'Node course'
      },
      {
        id: '/123abc3',
        name: 'Phan3',
        room: 'React Course'
      }
    ]
  })
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
  it("should return list user name of course", () => {
    const userList = listUsers.getUserList('Node course');
    expect(userList).toEqual(['Phan1', 'Phan2']);
  })
  it("should return list user name of course 2", () => {
    const userList = listUsers.getUserList('React Course');
    expect(userList).toEqual(['Phan3']);
  })
  it("should find user", () => {
    let id = '/123abc3'
    const user = listUsers.getUser(id);
    expect(user.id).toEqual(id);
  })
  it("should not find  user", () => {
    let id = '/notfind'
    const user = listUsers.getUser(id);
    expect(user).toBeFalsy();
  })
  it("should remove  user", () => {
    let id = '/123abc3'
    const user = listUsers.removeUser(id);
    expect(user.id).toBe(id);
    expect(listUsers.users.length).toBe(2);
  })
  it("should not remove  user", () => {
    let id = '/notfind'
    const user = listUsers.removeUser(id);
    expect(user).toBeFalsy();
    expect(listUsers.users.length).toBe(3);
  })

})