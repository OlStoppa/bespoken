const join = jest.fn(() => {
  return new Promise((res, rej) => res);
})

const on = jest.fn();
const close = jest.fn();
const createProducer = jest.fn(() => ({ close }))

export const Room = jest.fn().mockImplementation(() => {
  return { join, on, createProducer }
})