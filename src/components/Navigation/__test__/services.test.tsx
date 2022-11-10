import * as services  from '../services';

const moockedUrl = 'https://github.com/facebook/react';
const moockedIncorrectUrl = 'https://github.com/notfacebook/notreact';
const mockedReceivedStargazers_count: number = 100500;

afterEach(() => {
    jest.restoreAllMocks();
})

describe("Fetching data", () => {
    it("should return error when fetching rating of repository with incorrect URL", async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 400,
            json: () => Promise.resolve({ success: false  }),
        }),
        ) as jest.Mock;

        await expect(services.getStarGazersCount(moockedIncorrectUrl)).rejects.toThrowError('Incorrect request');
        expect(global.fetch).toHaveBeenCalledTimes(1);
    }); 
    it("should return rating of repository with correct URL", async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 200,
            ok: true,
            json: () => Promise.resolve({ stargazers_count: mockedReceivedStargazers_count }),
        }),
        ) as jest.Mock;

        await expect(services.getStarGazersCount(moockedUrl)).resolves.toBe(mockedReceivedStargazers_count);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});