// github Controller test
const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { getUser } = require('../../server/controllers/githubController');

describe('GitHub Controller - getUser', () => {
  it('should return user data when GitHub API succeeds', async () => {
    const mockUser = {
      name: 'Noah Mashaba',
      avatar_url: 'https://example.com/avatar.png',
      bio: 'Developer',
      public_repos: 10,
      html_url: 'https://github.com/noahmashaba',
    };
    sinon.stub(axios, 'get').resolves({  mockUser });

    const mockReq = { params: { username: 'noahmashaba' } };
    const mockRes = {
      json: sinon.spy(),
      status: () => mockRes,
    };

    await getUser(mockReq, mockRes);

    expect(mockRes.json.calledOnce).to.be.true;
    expect(mockRes.json.firstCall.args[0]).to.deep.include({
      name: 'Noah Mashaba',
      bio: 'Developer',
    });

    axios.get.restore();
  });
});