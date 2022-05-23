import request from 'supertest';
import app from '../../app';

describe('Test GET /launches', () => {
    it('It should respond with 200 success', async () => {
        await request(app)
            .get('/launches')
            .expect('Content-type', /json/)
            .expect(200);
    });
});

describe('Test POST /launches', () => {
    const completeLaunchDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028'       
    }

    const launchDateWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f'     
    }

    const launchDataWithInvalidDate = {
        ...completeLaunchDate,
        launchDate: 'zoot'
    }

    it('It should respond with 200 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchDate)
            .expect('Content-type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(launchDateWithoutDate);
    });

    it('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDateWithoutDate)
            .expect('Content-type', /json/)
            .expect(400);
            
        expect(response.body).toStrictEqual({ error: 'Missing require launch property' });
    });

    it('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-type', /json/)
            .expect(400);
            
        expect(response.body).toStrictEqual({ error: 'Invalid launchDate' });
    });
});