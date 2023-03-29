import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export default function renderWithUserEvent(jsx: JSX.Element) {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(jsx),
  };
}

const getUrlAndQueryString = (input: RequestInfo | URL) => {
  const { origin, pathname, search } =
    input instanceof URL ? input : new URL(input.toString());
  const url = origin + pathname;

  return { url, queryString: search };
};

const matchUrl = (expected: string, actual: RequestInfo | URL) => {
  const expectedInfo = getUrlAndQueryString(expected);
  const actualInfo = getUrlAndQueryString(actual);

  // console.log(expectedInfo);
  // console.log(actualInfo);

  return (
    expectedInfo.url === actualInfo.url &&
    expectedInfo.queryString === actualInfo.queryString
  );
};

export const mockFetch =
  (url: string, response: Response) =>
  (input: RequestInfo | URL, init: RequestInit | undefined) =>
    Promise.resolve(matchUrl(url, input) ? response : Response.error());
