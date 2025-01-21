import { beforeAll, afterAll, afterEach, vi } from "vitest";

afterEach(() => {
  vi.resetAllMocks();
});

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.stubGlobal("fetch", vi.fn());

global.FormData = class FormData {
  append = vi.fn();
} as any;

global.File = class File {
  constructor(
    public bits: any[],
    public name: string,
    public options?: FilePropertyBag
  ) {}
} as any;
