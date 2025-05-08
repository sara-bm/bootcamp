const request = require('supertest');
const app = require('./app'); // Assuming the express app is exported
const { faker } = require('faker');

describe('GET /teams/:week/:team', () => {
  it('should return an empty array when team and week do not exist', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const response = await request(app).get(`/teams/${week}/${team}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return team members when team and week exist', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const member = { name: faker.name.fullName(), role: faker.random.word(), image: faker.image.url() };
    mockData[week] = { [team]: [member] };
    const response = await request(app).get(`/teams/${week}/${team}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([member]);
  });

  it('should return a 404 status when week is missing', async () => {
    const team = faker.random.word();
    const response = await request(app).get(`/teams//${team}`);
    expect(response.status).toBe(404);
  });

  it('should return a 404 status when team is missing', async () => {
    const week = faker.random.word();
    const response = await request(app).get(`/teams/${week}/`);
    expect(response.status).toBe(404);
  });
});

describe('POST /teams/:week/:team/members', () => {
  beforeEach(() => {
    mockData = {};
  });

  it('should add a new member when request is valid', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const newMember = { name: faker.name.fullName(), role: faker.random.word(), image: faker.image.url() };
    const response = await request(app).post(`/teams/${week}/${team}/members`).send(newMember);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Member added successfully');
    expect(response.body.member).toEqual(newMember);
  });

  it('should return a 400 status when member name is missing', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const newMember = { role: faker.random.word(), image: faker.image.url() };
    const response = await request(app).post(`/teams/${week}/${team}/members`).send(newMember);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Member name and role are required.');
  });

  it('should return a 400 status when member role is missing', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const newMember = { name: faker.name.fullName(), image: faker.image.url() };
    const response = await request(app).post(`/teams/${week}/${team}/members`).send(newMember);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Member name and role are required.');
  });

  it('should return a 400 status when request body is empty', async () => {
    const week = faker.random.word();
    const team = faker.random.word();
    const response = await request(app).post(`/teams/${week}/${team}/members`).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Member name and role are required.');
  });
});