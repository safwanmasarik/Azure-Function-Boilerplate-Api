export default function mockMssql(queryMockFn = defaultQueryMockFn) {
    jest.mock('mssql', () => {
        return {
            connect: jest.fn((connectionStr) => Promise.resolve({
                config: { parseJSON: true },
                request: jest.fn(() => {
                    return {
                        query: queryMockFn
                    }
                }),
            }))
        }
    });
}

const defaultQueryMockFn = jest.fn()
    .mockImplementation((query) => {
        return Promise.resolve({
            recordsets: [[[]]]
        })
    });

/**
 * To demo possible usage 
 */
const _demoQueryMockFn = jest.fn()
    .mockImplementation((query) => {
        // can customise return values if necessary based on the 
        // number of times mocked function was called
        if (_demoQueryMockFn.mock.calls.length == 1) {
            // first query call: queryA
            console.log(`\n\nfirst call\n\n`);
        }
        else {
            console.log(`\n\nsecond call\n\n`);
        }
        return Promise.resolve({
            recordsets: [[[]]]
        })
    })
