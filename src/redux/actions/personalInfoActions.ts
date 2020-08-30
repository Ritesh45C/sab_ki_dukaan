export const INPUT_HANDLER = 'INPUT_HANDLER';
export const INPUT_HANDLER_REQ = 'INPUT_HANDLER_REQ';

type inputType = {
  name: string;
  value: string;
};

export const inputHandler = (payload: inputType, step: string) => ({
  type: INPUT_HANDLER,
  input: payload,
  step: step,
});
export const inputHandlerRequest = () => ({
  type: INPUT_HANDLER_REQ,
});
