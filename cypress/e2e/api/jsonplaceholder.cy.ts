/**
 * API tests against JSONPlaceholder (https://jsonplaceholder.typicode.com),
 * a free public fake REST API. All calls use cy.request(); no UI involved.
 * JSONPlaceholder is a fake API: POST/PUT/PATCH/DELETE return success
 * responses but do not persist changes.
 */

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

describe('JSONPlaceholder API (jsonplaceholder.typicode.com)', () => {
  const api = 'https://jsonplaceholder.typicode.com';

  it('GET /posts returns 100 posts with the expected shape', () => {
    cy.request<Post[]>('GET', `${api}/posts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(100);
      const first = response.body[0];
      expect(first).to.have.all.keys('userId', 'id', 'title', 'body');
      expect(first.id).to.eq(1);
    });
  });

  it('GET /posts/1 returns the known first post', () => {
    cy.request<Post>('GET', `${api}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.userId).to.eq(1);
      expect(response.body.title).to.eq(
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      );
    });
  });

  it('GET /posts?userId=1 returns only that user’s 10 posts', () => {
    cy.request<Post[]>('GET', `${api}/posts`, { userId: 1 }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(10);
      response.body.forEach((post) => expect(post.userId).to.eq(1));
    });
  });

  it('POST /posts creates a post and returns 201 with id 101', () => {
    cy.fixture('newPost').then((newPost) => {
      cy.request<Post>('POST', `${api}/posts`, newPost).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.id).to.eq(101);
        expect(response.body.title).to.eq(newPost.title);
      });
    });
  });

  it('PUT /posts/1 replaces the post and returns the updated body', () => {
    cy.request<Post>('PUT', `${api}/posts/1`, {
      body: 'Updated body',
      id: 1,
      title: 'Updated title',
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('Updated title');
      expect(response.body.body).to.eq('Updated body');
    });
  });

  it('PATCH /posts/1 updates only the title', () => {
    cy.request<Post>('PATCH', `${api}/posts/1`, { title: 'Patched title' }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq('Patched title');
      expect(response.body.id).to.eq(1);
    });
  });

  it('DELETE /posts/1 returns 200 with an empty body', () => {
    cy.request('DELETE', `${api}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq({});
    });
  });

  it('GET /users returns 10 users with valid emails', () => {
    cy.request('GET', `${api}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(10);
      response.body.forEach((user: { email: string; id: number; name: string }) => {
        expect(user.email).to.match(/@/);
        expect(user.name).to.be.a('string').and.not.be.empty;
        expect(user.id).to.be.a('number');
      });
    });
  });
});
